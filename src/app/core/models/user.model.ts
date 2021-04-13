export class User {
    userId: string;
    password: string;
    role: string;
    categoryId: string[];
  
    constructor() {
      this.userId = '';
      this.password = '';
      this.role = '';
      this.categoryId = [];
    }
  }