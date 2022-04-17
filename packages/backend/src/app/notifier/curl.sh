curl -s --user 'api:1cf5144f2cda831f64d87931d923f4cf-162d1f80-2c30e523' \
       https://api.mailgun.net/v3/sandbox00f45bc74dbe457790e61c83eaa853d2.mailgun.org/messages \
       -F from='Air Restaurant <no-reply@air.restaurant.id>' \
       -F to=barnando13@gmail.com \
       -F subject='Hello' \
       -F text='Testing some Mailgun awesomeness!' \
       -F template='template_air_restaurant' \
       -F h:X-Mailgun-Variables='{ "data": {"user": {"fullname": "Erika Nas"},"collection_name": "Paling Enak"}}'
