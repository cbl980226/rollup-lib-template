// import { Driver, ServiceBuilder, Options } from 'selenium-webdriver/ie';
// import { driverLocation } from '../tools/selenium-manager';
import { Browser, Builder, By, WebDriver } from 'selenium-webdriver';
import expect from 'expect';
import { rollup } from './index';

describe('Simple tests', () => {
  let driver: WebDriver;

  before(async () => {
    // const service = new ServiceBuilder(driverLocation('ie')).build();
    // const options = new Options();

    // driver = Driver.createSession(options, service);
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  after(async () => await driver.quit());

  it('First Selenium script', async function () {
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    const title = await driver.getTitle();
    expect(title).toBe('Web form');

    await driver.manage().setTimeouts({ implicit: 500 });

    const textBox = await driver.findElement(By.name('my-text'));
    const submitButton = await driver.findElement(By.css('button'));

    await textBox.sendKeys('Selenium');
    await submitButton.click();

    const message = await driver.findElement(By.id('message'));
    const value = await message.getText();
    expect(value).toEqual('Received!');
  });

  it('lib test', () => {
    expect(rollup()).toBe('rollup');
  });
});
