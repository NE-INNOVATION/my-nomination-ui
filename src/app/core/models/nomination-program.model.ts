export class NominationProgram {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    nominationStartDate: string;
    nominationEndDate: string;
    courseAgenda: string;
    banner: string;
    userId: string;
    programId: string;
    isPublished : boolean;
    status : number;
  
    constructor() {
      this.description = '';
      this.startDate = new Date().toString();
      this.endDate = new Date().toString();
      this.nominationStartDate = new Date().toString();
      this.nominationEndDate = new Date().toString();
      this.courseAgenda = '';
      this.banner = '';
      this.userId = '';
      this.programId = "";
      this.isPublished = false;
      this.status = Status.Draft
    }
  }

  export enum Status {
    Draft = 0,
    Active = 1,
    Hold = 2,
    Deleted = 3,
  }
