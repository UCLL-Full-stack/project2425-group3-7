import { Film } from './film';
import { User } from './user';


export class Watchlist {
    private id?: number;
    private films: Film[]=[];
    private user: User;
    private creationDate: Date;

    constructor(watchlist:{id?: number, films: Film[], user: User, creationDate: Date}) {
        this.id = watchlist.id;
        this.films = watchlist.films;
        this.user = watchlist.user;
        this.creationDate = watchlist.creationDate;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFilms(): Film[] {
        return this.films;
    }

    getUser(): User {
        return this.user;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }
}