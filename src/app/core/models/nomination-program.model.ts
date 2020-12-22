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
  
    constructor() {
      this.description = '';
      this.startDate = "00/12/1600";
      this.endDate = "00/12/1600";
      this.nominationStartDate = "00/12/1600";
      this.nominationEndDate = "00/12/1600";
      this.courseAgenda = '';
      this.banner = '';
      this.userId = '';
      this.programId = "";
    }
  }