export interface IHobbyServiceFindByName {
  hobbyNames: string[];
}

export interface IHobbyServiceBulkInsert {
  names: {
    name: string;
  }[];
}
