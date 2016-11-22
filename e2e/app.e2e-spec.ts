import { MySelectPage } from './app.po';

describe('my-select App', function() {
  let page: MySelectPage;

  beforeEach(() => {
    page = new MySelectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
