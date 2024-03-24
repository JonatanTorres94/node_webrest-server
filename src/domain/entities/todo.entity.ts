

export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public createdAd ?: Date | null
    ){}

    get isCreated() {
        return !!this.createdAd;
    }

    public static fromObject (objet: {[key:string] :any}) :TodoEntity{

        const {id, text, createdAt} = objet

        //todo: Esto deberia ir en un log
        if (!id) throw 'Id is required'
        if (!text) throw 'Text is required'

        let newCreateAt;

        if(createdAt) {
            newCreateAt = new Date(createdAt);
            if(isNaN(newCreateAt.getTime())){
                throw 'CreatedAt is not a validad date'
            }
        }

        return new TodoEntity(id,text,createdAt)
    }
}