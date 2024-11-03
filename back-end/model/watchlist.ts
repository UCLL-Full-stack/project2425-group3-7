import { Film } from './film';
import { User } from './user';


export class Watchlist {
    private id?: number;
    private films: Film[];
    private user: User;
    private creationDate: Date;

    constructor(watchlist:{id?: number, films: Film[], user: User, creationDate: Date}) {
        this.validate(watchlist);

        this.id = watchlist.id;
        this.films = watchlist.films;
        this.user = watchlist.user;
        this.creationDate = watchlist.creationDate;
    }
    validate(watchlist:{films: Film[], user: User, creationDate: Date}){
        if (!watchlist.films) {
            throw new Error('Films are required');
        }
        if (!watchlist.user) {
            throw new Error('User is required');
        }
        if (!watchlist.creationDate) {
            throw new Error('Creation date is required');
        }
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

    addFilmToWatchlist(film: Film): void{
        if(!this.films.includes(film)){
            this.films.push(film);
        }
    }
}