import {
  ConflictException,
  // HttpException,
  // HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HobbyService } from 'api/hobby/hobby.service';
import {
  IUserServiceCleaningHobbies,
  IUserServiceCreate,
  IUserServiceFindOne,
  IUserServiceFindUserByEmail,
  IUserServiceRemove,
  IUserServiceRestore,
  IUserServiceUpdate,
} from './interfaces/user-service.interface';
import * as bcrypt from 'bcrypt';
import { TransactionService } from 'api/common/transaction.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hobbyService: HobbyService,
    private readonly transactionService: TransactionService,
  ) {}

  findUserByEmail({ userEmail }: IUserServiceFindUserByEmail): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email: userEmail,
      },
    });
  }

  async findOne({ userId }: IUserServiceFindOne): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'hobby',
        'diary',
        'body',
        'exercise',
        'smoking',
        'meditation',
      ],
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: [
        'hobby',
        'diary',
        'body',
        'exercise',
        'smoking',
        'meditation',
      ],
    });
  }

  async remove({ userId }: IUserServiceRemove): Promise<User> {
    const user = await this.findOne({ userId });
    const result = await this.userRepository.softRemove(user);
    console.log(result);
    return result;
  }

  async create({ createUserInput }: IUserServiceCreate): Promise<User> {
    return await this.transactionService.runInTransaction(async () => {
      const { hobby, password, ...user } = createUserInput;

      const isExists = this.findUserByEmail({ userEmail: user.email });
      if (isExists) {
        throw new ConflictException('이미 등록된 이메일입니다.');
      }
      // if (isExists) {
      //   throw new HttpException(
      //     '이미 등록된 아이디 입니다.',
      //     HttpStatus.CONFLICT,
      //   );
      // }

      const hashedPassword = await bcrypt.hash(password, 10);
      const hobbies = await this.cleaningHobbies({ hobby });
      const result = await this.userRepository.save({
        ...user,
        password: hashedPassword,
        hobby: hobbies,
      });
      return result;
    });
  }

  async update({ userId, updateUserInput }: IUserServiceUpdate): Promise<User> {
    const prevData = await this.findOne({ userId });
    const { hobby, ...user } = updateUserInput;
    const hobbies = hobby
      ? await this.cleaningHobbies({ hobby })
      : prevData.hobby;
    const userData = this.userRepository.create({
      ...prevData,
      hobby: hobbies,
      ...user,
    });
    return await this.userRepository.save(userData);
  }

  private async cleaningHobbies({ hobby }: IUserServiceCleaningHobbies) {
    const hobbyNames = hobby.map((el) => el.replace('#', ''));
    const prevHobbies = await this.hobbyService.findByNames({ hobbyNames });
    const temp = [];
    hobbyNames.forEach((el) => {
      const isExists = prevHobbies.find((prevEl) => el === prevEl.name);
      if (!isExists) temp.push({ name: el });
    });
    const newHobbies = await this.hobbyService.bulkInsert({ names: temp });
    return [...prevHobbies, ...newHobbies.identifiers];
  }

  async restore({ userId }: IUserServiceRestore): Promise<boolean> {
    const data = await this.userRepository.restore({ id: userId });
    console.log(data);
    return data.affected ? true : false;
  }

  async findAllWithDeleted(): Promise<User[]> {
    return await this.userRepository.find({
      relations: [
        'hobby',
        'diary',
        'body',
        'exercise',
        'smoking',
        'meditation',
      ],
      withDeleted: true,
    });
  }
}
