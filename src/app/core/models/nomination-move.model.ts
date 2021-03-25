import { NominationProgram } from "./nomination-program.model";
import { Nomination } from "./nomination.model";

export class NominationMove {
    categoryId: string;
    nominations: Nomination[];
    program :NominationProgram
     
    constructor() {
      this.categoryId = '';
      this.nominations = [];
      this.program = null;
    }
  }

  export enum Status {
    Draft = 0,
    Active = 1,
    Hold = 2,
    Deleted = 3,
  }
