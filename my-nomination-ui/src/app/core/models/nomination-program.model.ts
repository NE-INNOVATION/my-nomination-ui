export class NominationProgram {
    description: string;
    startdate: Date;
    enddate: Date;
    nominationStartDate: Date;
    nominationEndDate: Date;
    courseAgenda: string;
    banner: string;
    userId: string;
    programId: number;
  
    constructor() {
      this.description = '';
      this.startdate = new Date();
      this.nominationStartDate = new Date();;
      this.nominationEndDate = new Date();
      this.courseAgenda = '';
      this.banner = '';
      this.userId = '';
      this.programId = 0;
    }
  }