import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { routerTransition } from './_animations/router.transition.animation';
import { StorageService } from './_services/storage.service';
import { ThemeDialogComponent } from './shared/theme-dialog/theme-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'AngularMaterial';
  @HostBinding('class') componentCssClass;
  constructor(
    public overlayContainer: OverlayContainer,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    public dialog: MatDialog) {
    this.selectTheme(this.storageService.theme)
  }
  selectTheme(theme: string = null) {
    let selectedTheme = 'dark-indigo-theme';
    if (theme != null) {
      selectedTheme = theme;
    }

    this.applyTheme(selectedTheme);
    this.storageService.theme = selectedTheme;
  }

  applyTheme(theme: string) {
    this.componentCssClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove && toRemove.length > 0) {
      classList.remove(...toRemove);
    }

    classList.add(theme);
  }

  async viewTheme() {
    const dialogRef = this.dialog.open(ThemeDialogComponent);

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.selectTheme(result);
    }
  }
}
