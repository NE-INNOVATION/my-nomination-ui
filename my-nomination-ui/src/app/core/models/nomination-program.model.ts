export class NominationProgram {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    nominationStartDate: Date;
    nominationEndDate: Date;
    courseAgenda: string;
    banner: string;
    userId: string;
    programId: string;
  
    constructor() {
      this.description = '';
      this.startDate = new Date();
      this.endDate = new Date();
      this.nominationStartDate = new Date();;
      this.nominationEndDate = new Date();
      this.courseAgenda = '';
      this.banner = '';
      this.userId = '';
      this.programId = "";
    }
  }