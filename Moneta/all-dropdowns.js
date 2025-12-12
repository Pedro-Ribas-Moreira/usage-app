const menuData = [
  {
    name: 'Usage and Consumption',
    children: [
      {
        name: 'Usage and consumption check completed',
        children: [
          {
            name: 'L1E',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  'Customer called in regarding their usage/spend. Went through usage checks- Type of property, total members, verified tariff. Checked frequency of top ups on Liberty. 2-, 22- ,222- , Looked for appliances used. Asked customer to confirm home heating system. Advised regarding keypad functionality in order to monitor consumption- 6, 66. Shared usage and saving tips. Also reference links for keypad functionality and Energy saving tips shared over sms.',
              },
            ],
          },
          {
            name: 'L100',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  'Customer called in regarding their usage/spend. Went through usage checks- Type of property, total members, verified tariff. Checked frequency of top ups on Evo. Analysed usage/spend on Genio, Total spend- (Averages: Monthly-,Weekly- , Daily- ) Looked for appliances used. Asked customer to confirm heating system in home. Shared usage and saving tips. Reference links for Energy saving tips shared over sms.',
              },
            ],
          },
        ],
      },
      {
        name: 'Follow up usage and consumption query',
        children: [
          {
            name: 'Click here to copy note',
            isCopyNote: true,
            tooltip: 'Customer called back regarding their usage/spend. ',
          },
        ],
      },
      {
        name: 'Customer requesting further action',
        children: [
          {
            name: 'L1E',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in regarding their usage/spend. Went through usage checks- Type of property, total members, verified tariff. Checked frequency of top ups on Liberty. 2-, 22- ,222- , Looked for appliances used. Advised regarding keypad functionality in order to monitor consumption- 6, 66. Shared usage and saving tips. Customer is disputing usage, feels they're being overcharged. Suggested customer we can compare the increase in reads on both meters. Noted readings from both meters, ESB-, PPP-, .Advised to repeat this in a few more days so we can compare the two.Also reference links for keypad functionality and Energy saving tips shared over sms.",
              },
            ],
          },
          {
            name: 'L100',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in regarding their usage/spend. Went through usage checks- Type of property, total members, verified tariff. Checked frequency of top ups on Evo. Analysed usage/spend on Genio, Total spend- (Averages Monthly-,Weekly- , Daily- ) Looked for appliances used. Shared usage and saving tips. Customer is disputing usage, feels they're being overcharged. Suggested customer we can compare the increase in reads on both meters. Noted readings from both meters, ESB-, PPP-, .Advised to repeat this in a few more days so we can compare the two. Reference links for Energy saving tips shared over sms.",
              },
            ],
          },
        ],
      },
      {
        name: 'Price change query',
        children: [
          {
            name: 'Click here to copy note',
            isCopyNote: true,
            tooltip:
              'Customer called in to enquire on the price change. New rates advised. Informed regarding our lowest SUR. Customer happy',
          },
        ],
      },
      {
        name: 'Pricing/Tariff Query',
        children: [
          {
            name: 'Tariff',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip: 'Customer called in to enquire about his tariff. Tariff advised. ',
              },
            ],
          },
          {
            name: 'Tariff change - ESB smart meter',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  'Customer called in to enquire about his tariff. Looking to change his tariff. Tariffs advised.Confirmed with customer the reason why the wanted to change tarrif. Customer has an ESB smart meter. Advised SLA 6-12 weeks for tariff  change to be competed.  Request submitted via the BOT.',
              },
            ],
          },
          {
            name: 'Tariff change - No ESB smart meter',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  'Customer called in to enquire about his tariff. Looking to change his tariff. Tariffs advised.Confirmed with customer the reason they want to change tarrif. Customer does not have an ESB smart meter.  Advised charges would apply and the process for this. Informed SLA 6-12 weeks for tariff change to be competed. Customer wants to proceed. Request submitted via the BOT. Request submitted via the BOT.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Mobile App',
    children: [
      {
        name: 'Auto Top Up Query',
        children: [
          {
            name: 'How Auto Top up Works',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in to enqurie about the Auto-Top Up feature in the app. Advised on it's functions and application.",
              },
            ],
          },
          {
            name: 'Enable Auto Top Up',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  'Customer called in looking to activate the Auto Top Up on the app. Walked customer through the steps to enable the Auto top up. Customer successfully enabled the Auto top now.  ',
              },
            ],
          },
          {
            name: 'Disable Auto Top Up',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  'Customer called in looking to turn off the Auto Top up feature on the app. Walked customer through the steps to disable the Auto top up. Customer successfully disabled the Auto top now',
              },
            ],
          },
        ],
      },
      {
        name: 'Adding/Removing Card',
        children: [
          {
            name: 'Add new card',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  'Customer called in looking to add a new bank card into the wallet. Guided customer on how to add the new card into the app. New card saved into the wallet.',
              },
            ],
          },
          {
            name: 'Remove card',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in as they're unable to add the new bank card into the wallet. Old bank card deleted via CRM next. Guided customer on how to add the new card. ",
              },
            ],
          },
          {
            name: 'Unable able to add new card',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in as they're unable to add their bank card into the wallet. Walked customer through the process of adding the bank card step by step. Advised to check if if the bank/provider allows online transactions. Advised to check for authentication request from bank and to follow instructions on the screen. Customer followed as intructed but is still not able to save the card. Asked customer to share screenshots (if necessary) of the error, along with phone model , bank card type, expiry date and logged a Business Support ticket # detailing the issue. Advised customer will follow up with then once there's an update.",
              },
            ],
          },
        ],
      },
      {
        name: 'Registration Issue',
        children: [
          {
            name: 'Details incorrect on sign up',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in as they're unable to register on the  App. Email id and contact number verified on the account. Contact details updated as confirmed by customer. Customer has successfully registered now. ",
              },
            ],
          },
          {
            name: 'Previous record not cleared',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in as they're unable to register on the App with their new account. Email id disassociated from the old account. Customer has successfully registered now. ",
              },
            ],
          },
          {
            name: 'Password Issue',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in as they're unable to reset their app password/not receiving the verification codes. Contact details verified on maxpower and crmnext.  Details updated as confirmed by the customer. Advised on passwrod requirements while setting a new one. Customer was able to reset the password and logged in successfully.",
              },
            ],
          },
        ],
      },
      {
        name: 'Saving Feature',
        children: [
          {
            name: 'Click here to copy note',
            isCopyNote: true,
            tooltip:
              "Customer called in regards to the app's Savings feature. Explained it's functionality, how it works and how they may use it to control and budget their energy spend. Customer happy.",
          },
        ],
      },
      {
        name: 'Tech Issue',
        children: [
          {
            name: 'Graphs not displaying',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  'Customer called in stating that the app is not displaying their usage/graphs. (If new install- )Advised customer that usage/graphs could take upto 2 weeks to start to show up after a new install. WAN troubleshooting carried out to ensure signal is strong. Confirmed meter details are correct on Maxpower.',
              },
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in stating that the app is not displaying their usage/graphs. (If not new install- ). WAN troubleshooting carried out to ensure signal is strong. Budget controller checked to see if the meter number is saved, logged a business support ticket if meter number wont save. Advised customer will follow up with them one there's an update. ",
              },
            ],
          },
          {
            name: 'Rearm not working',
            children: [
              {
                name: 'Remote re-arm done',
                children: [
                  {
                    name: 'Click here to copy note',
                    isCopyNote: true,
                    tooltip:
                      'Customer called in as they topped up into a +ve balance but restore power option is not refelcting within the app. Balance is --. Remote re-arm done on SFE. Power restored. Known issue, added to business support ticket #PPP00133339.',
                  },
                ],
              },
              {
                name: 'Manual restoration',
                children: [
                  {
                    name: 'Click here to copy note',
                    isCopyNote: true,
                    tooltip:
                      'Customer called in as they topped up into a +ve balance but restore power option is not refelcting within the app. Balance is --. Tried doing a remote re-arm via SFE but request failed. Manual restoration required. Read safety statement and gave the customer the Supply Codes to enter into the meter. Asked to press BAB,  power is now restored. Known issue, added to business support ticket #PPP00133339.',
                  },
                ],
              },
            ],
          },
          {
            name: 'Login issue',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in as they're unable to log into the app. Contact details verified on maxpower and crmnext. Ensured contact details are correct. Guide customer on how to reset password. Customer was able to login now. ",
              },
              {
                name: 'App service unavailable/App Crashing',
                children: [
                  {
                    name: 'Click here to copy note',
                    isCopyNote: true,
                    tooltip:
                      "Customer called in as they're unable to log into the app. Shows App service unavailable. Advised customer to try uninstalling and installing it back again. Also asked the customer to try to reset their password on the website. Customer still having issues. Logged business support ticket # detailing the issue. Advised customer will follow up with them once there's an update.",
                  },
                ],
              },
            ],
          },
          {
            name: 'Password Issue',
            children: [
              {
                name: 'Click here to copy note',
                isCopyNote: true,
                tooltip:
                  "Customer called in as they're unable to reset their app password/not receiving the verification codes. Contact details verified on maxpower and crmnext.  Details updated as confirmed by the customer. Advised on passwrod requirements while setting a new one. Customer was able to reset the password and logged in successfully.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export { menuData };
