const webpush = require('web-push');

const vapidKeys = {
    "publicKey":"BOoFFK4dOWRJbRYeomaLwEilj1k-yJZgk4u8gN-XJJQrczhCwd4-USBzvRXYyD-b7uBbKkXPsCxk6AZTr9y0llk",
    "privateKey":"xtle5CG0DnOGq10qFOdoes0Z63B_4cgYKGMFgkqD5Qk"
};

webpush.setGCMAPIKey('AAAAoQeUTz0:APA91bGYRspYlmu8vep2DYWmBa-HMknaxYb6WtGq1eYKp6rzNl3CVzszXlvOadkr-WWaXgP-dmXJdHC4wQL3XC-AqDNTpTC7WD43ol0bGHr2yYKi42MGOrj9K_Y3QyB98lgmknvhtlui');
webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
    );
const pushSubscription = {
    endpoint : 'https://fcm.googleapis.com/fcm/send/fmdCC4NToPQ:APA91bGYLuyqWJ3brCn5Fr3aMu4-b0iFooEjs-8eV3DeagFIym9IOuY5e_QhaYXEPm9eRHzM6JkPize5fAZIIebhkAC7v2uju6mwWI4iXuPgT8f0CC63k7qFMKWEEeIZ-Ckul45KDXNA',
    keys : {
        auth : 'jiZLBBxTBfwUjIKGs8B00g==',
        p256dh : 'BOsyMHu0907czGBFSWwizHffpB9qnjoRUg/YO94Pmm5nyYJEDHAM2K4tYrfWzuW2e4kt+L2X8npivV9Hnb2Zk28='
    }
}

webpush.sendNotification(pushSubscription, 'Payload body From Server');