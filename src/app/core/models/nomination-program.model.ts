export class NominationProgram {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    courseAgenda: string;
    banner: string;
    userId: string;
    programId: string;
    isPublished : boolean;
    isClosed : boolean;
    status : number;
    categoryId : string;
    category: string
  
    constructor() {
      this.description = '';
      this.startDate = new Date().toString();
      this.endDate = new Date().toString();
      this.courseAgenda = '';
      this.banner = '';
      this.userId = '';
      this.programId = "";
      this.categoryId = '';
      this.category = "";
      this.isPublished = false;
      this.isClosed = false;
      this.status = Status.Draft
    }
  }

  export enum Status {
    Draft = 0,
    Active = 1,
    Hold = 2,
    Deleted = 3,
  }
