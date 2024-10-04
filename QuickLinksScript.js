const drawer = document.querySelector('#Links-Drawer');
const WebsiteUL = document.querySelector('#WebsiteLinks');
const KnowledgeBaseUL = document.querySelector('#KnowledgeBaseList');

const WebsiteList = [
  {
    name: 'Saving Tips',
    url: 'https://www.prepaypower.ie/saving-energy',
  },
  {
    name: 'Payment Options & Rates',
    url: 'https://www.prepaypower.ie/why-switch/pricing/rates',
  },
  {
    name: 'App Support',
    url: 'https://www.prepaypower.ie/support/app-support',
  },
  {
    name: 'PSO Levy Refund',
    url: 'https://www.prepaypower.ie/support/pso-levy-refund',
  },
  {
    name: 'Estimate Annual Bill FAQs',
    url: 'https://www.prepaypower.ie/why-switch/pricing/estimated-annual-bill-faqs',
  },
];

const KnowledgeBaseList = [
  {
    name: ' Customer Vend Request    ',
    url: 'http://https://yuno.shelf-eu.com/read/97a1f29e-ab9a-4bfe-857d-8636d4d84206/?component=auto-suggest&source=shelf&view=dashboard',
  },
  {
    name: 'Emergency Credit',
    url: 'http://intranet.prepaypower.ie/customer-experience/knowledge-base/advance-credit',
  },
  {
    name: '  Retention Training',
    url: 'http://intranet.prepaypower.ie/customer-experience/knowledge-base/advance-credit',
  },
  {
    name: 'PSO Levy Refund',
    url: 'http://intranet.prepaypower.ie/customer-experience/knowledge-base/advance-credit',
  },
  {
    name: 'Estimate Annual Bill FAQs',
    url: 'http://intranet.prepaypower.ie/customer-experience/knowledge-base/advance-credit',
  },
];

WebsiteList.forEach((e) => {
  const link = document.createElement('a');
  link.classList.add('w-full');
  link.setAttribute('href', e.url);
  link.setAttribute('target', 'Blank');
  link.innerHTML = ` <li class="pl-4  list-none border-b-2  border-transparent hover:border-slate-200 website-list-item">${e.name}</li>`;
  WebsiteUL.appendChild(link);
});

KnowledgeBaseList.forEach((e) => {
  const link = document.createElement('a');
  link.classList.add('w-full');
  link.setAttribute('href', e.url);
  link.setAttribute('target', 'Blank');
  link.innerHTML = ` <li class="pl-4 list-none	border-b-2  border-transparent hover:border-slate-200 kb-list-item">${e.name}</li>`;
  KnowledgeBaseUL.appendChild(link);
});
