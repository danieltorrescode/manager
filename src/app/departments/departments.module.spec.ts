import { DepartmentsModule } from './departments.module';

describe('DepartmentsModule', () => {
  let departmentsModule: DepartmentsModule;

  beforeEach(() => {
    departmentsModule = new DepartmentsModule();
  });

  it('should create an instance', () => {
    expect(departmentsModule).toBeTruthy();
  });
});
