import { NgModule } from "@angular/core";
import { CardComponent } from "../home/card/card.component";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@NgModule({
    declarations:[CardComponent],
    imports:[
        CommonModule,
        MatCardModule,
        RouterLink
    ],
    exports:[CardComponent]
})
export class SharedModule {}