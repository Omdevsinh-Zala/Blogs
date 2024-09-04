import { NgModule } from "@angular/core";
import { CardComponent } from "../home/card/card.component";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[CardComponent],
    imports:[
        CommonModule,
        MatCardModule
    ],
    exports:[CardComponent]
})
export class SharedModule {}