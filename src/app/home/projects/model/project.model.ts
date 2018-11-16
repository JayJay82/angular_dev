import { IProject } from './IProject.model';
export class Project implements IProject {
     id : number;
     title : string;
     description : string;
     image : string;
    
    constructor()
    constructor(
        $id : number,
        $title : string,
        $description : string,
        $image ?: string
    )
    constructor(
        $id? : number,
        $title? : string,
        $description? : string,
        $image? : string
    ) {
        this.id = $id;
        this.title = $title;
        this.description = $description;
        this.image = $image;
    }
     
    
}