import puppeteer from 'puppeteer';
import dns from 'dns/promises'

export const getFraxResult = async (details) => {
  console.log("details", details);

  let chromeIp = await dns.lookup("chrome");

  console.log("chromeIp", chromeIp);

  let errMsg = "";
  // const browser = await puppeteer.launch({
  //   // executablePath: process.env.CHROME_BIN || null,
  //   browserWSEndpoint: remoteChromeRes.webSocketDebuggerUrl,
  //   ignoreHTTPSErrors: true,
  //   // headless: true,
  //   // args: ['--no-sandbox', '--headless', '--disable-gpu']
  // });
  
  const browser = await puppeteer.connect({
    browserURL: `http://${chromeIp.address}:9222`,
  });

  const page = await browser.newPage();

  // Event handling - if any alert shown, just click on Ok button
  page.on('dialog', async dialog => {
    errMsg = dialog.message()
    await dialog.accept();
  });

  await page.goto('https://www.sheffield.ac.uk/FRAX/tool.aspx');

  await page.type('#ctl00_ContentPlaceHolder1_toolage', `${details.age}`, { delay: 100 });

  // await page.type('#ctl00_ContentPlaceHolder1_year', details.dob.year);
  // await page.type('#ctl00_ContentPlaceHolder1_month', details.dob.month);
  // await page.type('#ctl00_ContentPlaceHolder1_day', details.dob.day);
  await page.type('#ctl00_ContentPlaceHolder1_bmd_input', `${details.bmd}`);
  await page.type('#ctl00_ContentPlaceHolder1_toolweight', `${details.weight}`);
  await page.type('#ctl00_ContentPlaceHolder1_ht', `${details.height}`);

  // Sex
  if (details.sex === "M") {
    await page.click('#ctl00_ContentPlaceHolder1_sex1');
  } else {
    await page.click('#ctl00_ContentPlaceHolder1_sex2');
  }

  // Previous Fracture
  if (details.previousFracture) {
    await page.click('#ctl00_ContentPlaceHolder1_previousfracture2');
  } else {
    await page.click('#ctl00_ContentPlaceHolder1_previousfracture1');
  }

  // Parent Fractured Hip
  if (details.parentFracturedHip) {
    await page.click('#ctl00_ContentPlaceHolder1_pfracturehip2');
  } else {
    await page.click('#ctl00_ContentPlaceHolder1_pfracturehip1');
  }

  // Current Smoking
  if (details.currentSmoking) {
    await page.click('#ctl00_ContentPlaceHolder1_currentsmoker2');
  } else {
    await page.click('#ctl00_ContentPlaceHolder1_currentsmoker1');
  }

  // Glucocorticoids
  if (details.glucocorticoids) {
    await page.click('#ctl00_ContentPlaceHolder1_glucocorticoids2');
  } else {
    await page.click('#ctl00_ContentPlaceHolder1_glucocorticoids1');
  }

  // Rheumatoid arthritis
  if (details.rheumatoidArthritis) {
    await page.click('#ctl00_ContentPlaceHolder1_arthritis2');
  } else {
    await page.click('#ctl00_ContentPlaceHolder1_arthritis1');
  }

  // Secondary osteoporosis
  if (details.secondaryOsteoporosis) {
    await page.click('#ctl00_ContentPlaceHolder1_osteoporosis2');
  } else {
    await page.click('#ctl00_ContentPlaceHolder1_osteoporosis1');
  }

  // Alcohol 3 or more units/day
  if (details.alcohol3OrMore) {
    await page.click('#ctl00_ContentPlaceHolder1_alcohol2');
  } else {
    await page.click('#ctl00_ContentPlaceHolder1_alcohol1');
  }


  // Submit the form
  await page.evaluate(() => {
    document.querySelector('#ctl00_ContentPlaceHolder1_btnCalculate').click();
  });

  await new Promise(r => setTimeout(r, 5000));

  if (await page.$('.result-wrap') !== null) {

    // Get BMI
    await page.waitForSelector('#ctl00_ContentPlaceHolder1_lbbmi')
    let bmiElement = await page.$('#ctl00_ContentPlaceHolder1_lbbmi')
    let bmiValue = await page.evaluate(el => el.textContent, bmiElement)

    // Get Major osteoporotic
    await page.waitForSelector('#ctl00_ContentPlaceHolder1_lbrs1')
    let majorOsteoporoticElement = await page.$('#ctl00_ContentPlaceHolder1_lbrs1')
    let majorOsteoporoticValue = await page.evaluate(el => el.textContent, majorOsteoporoticElement)

    // Get Hip Fracture
    await page.waitForSelector('#ctl00_ContentPlaceHolder1_lbrs2')
    let hipFractureElement = await page.$('#ctl00_ContentPlaceHolder1_lbrs2')
    let hipFractureElementValue = await page.evaluate(el => el.textContent, hipFractureElement)

    await page.close()
    // await browser.close()

    return {
      BMI: bmiValue.split("BMI: ")[1],
      majorOsteoporotic: majorOsteoporoticValue,
      hipFracture: hipFractureElementValue
    }
  } else {
    await page.close()
    await browser.close()

    return {
      error: errMsg
    }
  }
};

export const getFallDetectionResult = async (totalScore) => {
  let interpretation = '';
  let status;

  if (totalScore >= 0 && totalScore <= 20) {
    interpretation = "Wheelchair bound";
    status = sequelize.models.SelfAssessment.getStatus().RISKY;
  } else if (totalScore >= 21 && totalScore <= 40) {
    interpretation = "Walking assistance"
    status = sequelize.models.SelfAssessment.getStatus().MODERATE;
  } else if (totalScore >= 41 && totalScore <= 56) {
    interpretation = "Independent"
    status = sequelize.models.SelfAssessment.getStatus().EXCELLENT;
  }

  return {
    totalScore,
    interpretation,
    status
  }
}