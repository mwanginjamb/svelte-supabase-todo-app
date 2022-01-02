export  class TodoModel {
    constructor(
        public task?: string,
        public id?: number,
        public created_at?: number,
        public created_by?: string,
        public done?: boolean,
        public done_at?: string,
        public notes?:string

    ) {}
}