// const mailgun = require("mailgun-js");
import { ApplicationError } from '@core/domain/AppError';
import { injectable } from 'inversify';
import mailgun from 'mailgun-js'

const DOMAIN = "sandbox00f45bc74dbe457790e61c83eaa853d2.mailgun.org";
const MAILGUN_API_KEY = "1cf5144f2cda831f64d87931d923f4cf-162d1f80-2c30e523"


// # Send an email using your active template with the above snippet
// # You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

@injectable()
export class NotifierApplicationService {

  sendInvitation(to: string, from: string, link: string, favoritesName: string) {
    const dataPayload = {
      "data": {
        "user": {
          "fullname": from
        },
        "url": link,
        "collection_name": favoritesName
      }
    }

    const mail = {
      from: "Air Restaurant <postmaster@sandbox00f45bc74dbe457790e61c83eaa853d2.mailgun.org>",
      to: to,
      subject: `Your Friend ${dataPayload.data.user.fullname} share their Favorite`,
      template: "template_air_restaurant",
      'h:X-Mailgun-Variables': JSON.stringify(dataPayload, null, 2)
    };


    const mg = mailgun({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });

    mg.messages().send(mail, function (err: any, body: any) {
      if (err) {
        throw new ApplicationError("500", 500, err)
      }
      console.log(body);
    });

    return null
  }

}