import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWineComponent } from './add-edit-wine.component';

describe('AddEditWineComponent', () => {
  let component: AddEditWineComponent;
  let fixture: ComponentFixture<AddEditWineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditWineComponent]
    });
    fixture = TestBed.createComponent(AddEditWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
