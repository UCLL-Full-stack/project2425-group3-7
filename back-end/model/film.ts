export class Film {
    private id?: number;
    private title: string;
    private genre: string;
    private releasedate: Date;
    private description: string;
    private rating: number;

    constructor(film:{id?: number, title: string, genre: string, releasedate: Date, description: string, rating: number}) {
        this.id = film.id;
        this.title = film.title;
        this.genre = film.genre;
        this.releasedate = film.releasedate;
        this.description = film.description;
        this.rating = Math.round(film.rating * 10) / 10;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getGenre(): string {
        return this.genre;
    }

    getReleaseDate(): Date {
        return this.releasedate;
    }

    getDescription(): string {
        return this.description;
    }

    getRating(): number {
        return this.rating;
    }

    equals(film: Film): boolean {
        return (
            this.id === film.getId() &&
            this.title === film.getTitle() &&
            this.genre === film.getGenre() &&
            this.releasedate === film.getReleaseDate() &&
            this.description === film.getDescription() &&
            this.rating === film.getRating()
        );
    }
}