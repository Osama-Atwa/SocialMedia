import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Component, Inject } from '@angular/core';

@Component({
  templateUrl: './Error.component.html',
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
