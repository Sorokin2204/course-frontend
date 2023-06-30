import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';

import { Box, useMediaQuery } from '@mui/material';
import { Transition } from 'react-transition-group';
import { getTypeComponents } from '../../components/site/getTypeComponents';
import AnimateHeight from 'react-animate-height';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import Result from '../../components/site/Result';
import { setActiveChapter } from '../../redux/slices/app.slice';
import { getNameBusiness } from '../../redux/actions/data/getNameBusiness';
import { getTypeBusiness } from '../../redux/actions/data/getTypeBusiness';
import { getTypeOfSale } from '../../redux/actions/data/getTypeOfSale';
import { getWhereSale } from '../../redux/actions/data/getWhereSale';
import { upsertResult } from '../../redux/actions/user/upsertResult';
import { getResult } from '../../redux/actions/user/getResult';
import { NumericFormat } from 'react-number-format';

const dataStepDefault = [
  {
    type: 'title',
    value: `Анықтама! 
Бұл формула СНГ бойынша ТОП-150 компаниялардың бойынан практикадан өткен универсалды авторлық бизнес-аналитикаға арналған инструмент(10 млн, 100 млн, 1 млрд, 15 млрд тіпті 1 трлн обороты бар компаниялардан өткен формула).`,
  },
  { type: 'video', src: 'https://www.youtube.com/watch?v=bJWkoVTlXRQ&ab_channel=MBusiness' },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Салем, Бахтияр</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: (
      <>
        Толығырақ айтар болсақ, негізгі қызметім кез келген бизнестің диагностикасын жасап , жүйелі түрде табысыңызды көтеріп қана қоймай компанияңызды масштабқа шығаруға көмектесемін.  Бұл  инструмент фирма қызметіндегі қателер мен кемшіліктерді анықтауға, шығындарды азайтуға/оңтайландыруға және
        жұмыс процесінің тиімділігін арттыруға көмектеседі.
      </>
    ),
  },
  {
    type: 'chat',
    value: <>Ал енді біз танысайық, сіз өзіңіз туралы аздап айтып берсеңіз!</>,
  },
  {
    type: 'inputs',
    title: <>Введи информацию о себе</>,
    fields: [
      {
        label: 'Пол',
        name: 'gender',
        type: 'radio',
        list: [
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' },
        ],
      },
      {
        label: 'Ваш возраст',
        name: 'year',
        type: 'number',
      },
      {
        label: 'Город',
        name: 'city',
        type: 'text',
      },
      {
        label: 'Почта',
        name: 'email',
        type: 'email',
      },
      {
        label: 'Опыт в бизнесе, лет',
        name: 'expInBussines',
        type: 'number',
      },
      {
        label: 'Название вашего бизнеса',
        name: 'nameBusiness',
        type: 'text',
      },
      {
        label: 'Существование вашего бизнеса, лет',
        name: 'yearBusiness',
        type: 'number',
      },
      {
        label: 'Выберите вид бизнеса',
        name: 'choiceBusiness',
        type: 'select',
        options: [],
      },
      {
        label: 'Выберите вид продажи',
        name: 'typeOfSale',
        type: 'select',
        options: [],
      },
      {
        label: 'Выберите где продаете',
        name: 'whereSale',
        type: 'select',
        options: [],
      },
    ],
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Керемет! Ал енді сізбен жұмысқа кірісейік, бірақ әзірше бізбен байланыста қалу үшін   What’sApp чатқа  қосылыңыз. What's app группаға қосылу үшін осы сілтемеге кіріңіз </>,
  },

  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Дайын!</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Ендеше, бастайық. Бұл платформа симулятор негізінде жасалған.  </>,
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Симулятор деген не?</>,
  },

  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: (
      <>
        Симулятор - бұл   виртуалды жасанды IT интелект , бұл инструмент сіздің кәсібіңізді жүелі түрде басқарып қана қоймай, сізді операционка-дан шығуыңызға көмектеседі(операционка-да жүрген адамның байуына уақыт жоқ).Инструментті еңгізу барысында сізді тек қажетті және өзекті құралдар жиынтығы
        мен практикалық тапсырмалар күтеді. Симуляторды сіз өзіңізге ыңғайлы уақытта қолдана аласыз.
      </>
    ),
  },
  {
    type: 'chat',
    value: <>Жұмысымызды бастайық. Ол үшін 1 айдағы компанияның орташа саудасын(оборот) жазыңыз. </>,
  },

  {
    chapter: 'Айналым(обороты)',
    type: 'inputs',
    title: <>Өз оборотыңызды жазыныз(Выручка)</>,
    fields: [
      {
        label: 'Айналым',
        name: 'turnover',
        type: 'number',
      },
    ],
  },
  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: <>Енді, товардын үстіне қойып отырған наценкаңызды жазыныз(маржа)</>,
  },
  {
    type: 'chat',
    value: <>Егер сіз маржаның не екенін түсінбесеңіз немесе осы терминді егжей-тегжейлі зерттегіңіз келсе, осы тақырыптағы видеоны қараңыз.</>,
  },
  // {
  //   type: 'video',
  // },
  // {
  //
  //   type: 'inputs',
  //   title: <>Сіз өзіңіздің бағаңызды білесіз бе?</>,
  //   fields: [
  //     {
  //       label: 'Үстеме',
  //       name: 'margin',
  //       type: 'number',
  //     },
  //   ],
  // },
  {
    chapter: 'Үстеме(наценка)',
    type: 'inputs',
    title: <>Введи процент наценки</>,
    fields: [
      {
        label: 'Наценка, %',
        name: 'marginPercent',
        type: 'number',
      },
    ],
  },
  // {
  //   status: (form) => {
  //     const typeBusiness = parseInt(form.getValues('marginPercent'));
  //     if (typeBusiness < 15) {
  //       return 'bad';
  //     } else {
  //       return 'good';
  //     }
  //   },
  //   type: 'chat',
  //   valueStatus: (status) => {
  //     if (status == 'good') {
  //       return <>Жақсы!</>;
  //     } else {
  //       return (
  //         <>
  //           <b>Өте нашар.</b> <br /> <br /> Үстеме бағаны арттыру керек. Егер сізде көтерме сауда(оптом) болса, онда маржа 15%, ал бөлшек сауда(в розницу) болса, 30% және одан жоғары болуы керек.
  //         </>
  //       );
  //     }
  //   },
  // },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Ақпарат үшін рахмет. Мен оқуды жалғастырып, өз бизнесім туралы көбірек білгім келеді!</>,
  },

  {
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    value: <>Бәрекелді! Жалғастырайық. Сіздің қоймаңызда қанша сумманың тауары бар(остаток товара на складе)?</>,
  },
  {
    type: 'chat',
    value: <>Терминдерді түсінбегендіктен, мағлұматтарды қате толтырудан қорықпаңыз. Барлық ақпараттарды толтырып, диагностикамызды аяқтаған соң, терминдердің анықматаларын видеоролик арқылы талқылап береміз. Сондықтан, диагностикамызды қайта өтсеңіз болады.</>,
  },

  {
    chapter: 'Тауардың қалдығы(остаток товара)',
    type: 'inputs',
    title: <>Остаток товара</>,
    fields: [
      {
        label: 'Складыңызда шамамен қанша суммаға товар тұр?',
        name: 'restOfGoods',
        type: 'number',
      },
    ],
  },
  // {
  //   status: (form) => {
  //     const restOfGoodsValue = parseInt(form.getValues('restOfGoods'));
  //     const formula = parseFloat((parseInt(form.getValues('turnover')) - (parseInt(form.getValues('turnover')) * parseInt(form.getValues('marginPercent'))) / 100) / 2).toFixed(2);
  //     if (formula < restOfGoodsValue) {
  //       return 'bad';
  //     } else {
  //       return 'good';
  //     }
  //   },
  //   type: 'chat',
  //   valueStatus: (status) => {
  //     if (status == 'good') {
  //       return <>Өте жақсы нәтиже!</>;
  //     } else {
  //       return (
  //         <>Жағдайыңыз қиын екен. Себебі сіздің қоймаңыздағы тауардың саны  1 айда  сатылып жатқан тауардың санынан кемінде 2 есе төмен болуы керек ,яғни қазіргі жағдайда  сіз оборотыңызды кем дегенде 2-3  есе көтеруіңіз қажет.Бұл сұрақтың шешімін келесі инструментте нақты көрсететін боламыз.</>
  //       );
  //     }
  //   },
  // },

  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Бұл үшін қандай іс-шара қолдансам болады?</>,
  },
  {
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Поставщикке қанша қарызсыз?</>,
  },

  // {
  //   type: 'video',
  // },

  {
    chapter: 'Оптовиктердің/поставщиктердің алдындағы қарыз(долг перед постащиками)',
    type: 'inputs',
    title: <>Долг перед поставщиками</>,
    fields: [
      {
        label: 'Қанша қарызсыз?',
        name: 'duty',
        type: 'number',
      },
    ],
  },

  // {
  //   status: (form) => {
  //     const dutyValue = form.getValues('duty');
  //     const formula = (parseInt(form.getValues('restOfGoods')) * 0.4).toFixed(2);
  //     if (dutyValue == 0) {
  //       return 'good';
  //     } else if (dutyValue > formula) {
  //       return 'bad';
  //     } else {
  //       return 'normal';
  //     }
  //   },
  //   type: 'chat',
  //   valueStatus: (status) => {
  //     if (status == 'good') {
  //       return <>Тамаша!</>;
  //     } else if (status == 'bad') {
  //       return <>Бұл жаман(</>;
  //     } else {
  //       return <>Керемет жұмыс, жарайсың! Барлығы қалыпты.</>;
  //     }
  //   },
  // },

  {
    type: 'chat-self',
    value: <>Келесі сұрақ. Сіз айына рекламаға қанша ақша жұмсайсыз?</>,
  },
  // {
  //   type: 'video',
  // },

  {
    chapter: 'Маркетинг',
    type: 'inputs',
    title: <>Маркетинг пен жарнамаға айына қанша ақша жұмсайтыныңызды жазыңыз(айына)</>,
    fields: [
      {
        label: 'Рекламаның қаражаты',
        name: 'marketing',
        type: 'number',
      },
    ],
  },

  {
    status: (form) => {
      const marketingValue = parseInt(form.getValues('marketing'));
      const turnoverValue = parseInt(form.getValues('turnover'));
      const marginPercentValue = parseInt(form.getValues('marginPercent'));

      const formula = (marketingValue / turnoverValue).toFixed(2) * 100;
      const sumProductValue = turnoverValue - (turnoverValue * marginPercentValue) / 100;
      const dirtyValue = turnoverValue - (turnoverValue * (100 - marginPercentValue)) / 100 - marketingValue;
      form.setValue('marketingPercent', formula);
      form.setValue('dirty', dirtyValue);
      form.setValue('sumProduct', parseFloat(sumProductValue));
      return null;
      // if ((formula > 2 && formula < 3) || formula == 2 || formula == 3) {
      //   return 'normal';
      // } else if (formula > 3) {
      //   return 'bad';
      // } else {
      //   return 'very-bad';
      // }
    },
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    type: 'chat',
    valueStatus: (status) => {
      return 'Енді төмендегі шығындарға көңіл аударайық.';
      // if (status == 'normal') {
      //   return <>Жақсы</>;
      // } else if (status == 'bad') {
      //   return <>Тиімді емес маркетинг</>;
      // } else {
      //   return <>Рекламаға кеткен қаражатыңыз өте төмен, Клиентіңізге сараң болған сайын, сіздің де пайдаңыз өте төмен болады!</>;
      // }
    },
  },

  // {
  //   type: 'video',
  // },

  {
    type: 'chat',
    value: <>Ескерту: Бұл шығындарға маркетинг, тауардың өзіндік құны(себестоймость товара) және сотрудниктердің жалақысы кірмейді! Көрсеткіштерді жоғарыда айтылған көрсеткіштерді алып тастағанданы цифрларды енгізіңіз.</>,
  },

  {
    type: 'inputs',
    title: <>Шығындардың түрлерін енгізіңіз</>,
    fields: [
      {
        label: 'Тұрақты шығындар - Постоянные расходы(аренда, интернет и тд фикс)',
        name: 'constFlow',
        type: 'number',
      },
      {
        label: 'Өзгермелі шығындар - Переменные расходы(ком услуги, налоги, гсм и тд )',
        name: 'varFlow',
        type: 'number',
      },
      {
        label: 'Басқа шығындар - Прочие(мелкие ремонты, разовые расходы и тд)',
        name: 'otherFlow',
        type: 'number',
      },
    ],
  },
  {
    status: (form) => {
      const dirtyValue = parseInt(form.getValues('dirty'));
      const constFlowValue = parseInt(form.getValues('constFlow'));
      const varFlowValue = parseInt(form.getValues('varFlow'));
      const otherFlowValue = parseInt(form.getValues('otherFlow'));
      const flowValue = constFlowValue + varFlowValue + otherFlowValue;
      const cashValue = parseInt(dirtyValue - flowValue);
      const cashCommand = parseInt(cashValue * 0.3);
      const cashOwner = parseInt(cashValue - cashCommand);
      form.setValue('flow', flowValue);
      form.setValue('cash', cashValue);
      form.setValue('cashCommand', cashCommand);
      form.setValue('cashOwner', cashOwner);
      const dirtyBetween1 = parseInt(dirtyValue * 0.1);
      const dirtyBetween2 = parseInt(dirtyValue * 0.2);
      return null;
      // if (dirtyBetween1 > flowValue && flowValue < dirtyBetween2) {
      //   return 'good';
      // } else {
      //   return 'bad';
      // }
    },
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    valueStatus: (status) => {
      return 'Енді, сотрудниктерге төленетін жалақы мөлшерің еңгізіңіз(Фонд оплата труда)';
      // if (status == 'good') {
      //   return <>Нормально</>;
      // } else {
      //   return <>Плохо</>;
      // }
    },
  },

  {
    chapter: 'Компанияңыздын сотрудниктер саны және жалақысы',
    type: 'inputs',
    title: <>Компанияңыздын сотрудниктер саны және жалақысы</>,
    fields: [
      {
        label: 'Сотрудник саны',
        name: 'countPeople',
        type: 'number',
      },
      {
        label: 'Жалақыға арналған сумма',
        name: 'wage',
        type: 'number',
      },
    ],
  },
  // {
  //   type: 'inputs',
  //   title: <>Бонустар</>,
  //   fields: [
  //     {
  //       label: 'Бір айдағы таланттар саны',
  //       name: 'countTalentsPeople',
  //       type: 'number',
  //     },
  //     {
  //       label: 'Тоқсан ішінде үздік нәтиже көрсеткен қызметкерлер саны',
  //       name: 'countKpiPeople',
  //       type: 'number',
  //     },
  //     {
  //       label: 'Бір жылдағы ең жақсы нәтижелер',
  //       name: 'countBestResultPeople',
  //       type: 'number',
  //     },
  //   ],
  // },
  {
    status: (form) => {
      const directSalaryValue = parseInt(form.getValues('cashCommand')) / 2 / parseInt(form.getValues('countPeople'));
      const talentPeopleSalaryValue = parseInt(form.getValues('cashCommand')) / 2 / 3 / parseInt(form.getValues('countTalentsPeople')) + directSalaryValue;
      const directBonusValue = (parseInt(form.getValues('cashCommand')) / 2 / 3 / parseInt(form.getValues('countKpiPeople'))) * 3;
      const talentPeopleSalaryYearValue = directBonusValue * 4;
      const netProfit = parseInt(form.getValues('cash')) * 0.7;
      const reinvest = netProfit * 0.7;
      const cashOut = netProfit * 0.3;

      form.setValue('directSalary', directSalaryValue);
      form.setValue('talentPeopleSalary', talentPeopleSalaryValue);
      form.setValue('directBonus', directBonusValue);
      form.setValue('talentPeopleSalaryYear', talentPeopleSalaryYearValue);
      form.setValue('netProfit', parseInt(netProfit.toFixed(2)));
      form.setValue('reinvest', parseInt(reinvest.toFixed(2)));
      form.setValue('cashOut', parseInt(cashOut.toFixed(2)));
      return null;
    },
    type: 'chat',
    name: 'Бахтияр',
    avatar: 'https://i.pravatar.cc/32',
    valueStatus: (status) => {
      return <>Рахмет, осымен диагностика аяқталды, төменде диагностиканың жауабын қараңыз және видеороликтерді қарауды ұмытпаңыз</>;
    },
  },
  {
    type: 'chat-self',
    avatar: 'https://i.pravatar.cc/32',
    value: <>Дайын!</>,
  },

  {
    type: 'chapter-end',
  },
];
const dataVideoResult = [
  { type: 'video', src: 'https://www.youtube.com/watch?v=l4IB2-uTtPw&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=CwTesKkd3vI&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=MVmZsJFiysU&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=gZ2-83Lfscs&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=l7DaOl93drk&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=f_tOriWBHb0&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=7ZVIBsjmH_I&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=Zszy1-u78g4&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=QdyytYVaVzA&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=XE5_-QgBygs&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=1d1cZku7pA4&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=wfDqibKr3OU&ab_channel=MBusiness' },
  { type: 'video', src: 'https://www.youtube.com/watch?v=4P8n9OVGGb0&ab_channel=MBusiness' },
];
const getCheckupData = (form, isSecond = false) => {
  const turnoverValueSource = parseInt(form.getValues('turnover'));
  const restOfGoodsValue = parseInt(form.getValues('restOfGoods'));
  const turnoverValue = isSecond ? form.getValues('countPeople') * 5000000 : turnoverValueSource;
  const choiceBusinessValue = parseInt(form.getValues('choiceBusiness')?.margin);
  const choiceBusinessMarketing = parseFloat(form.getValues('choiceBusiness')?.marketing);
  const choiceBusinessMarketingText = form.getValues('choiceBusiness')?.marketingText;
  const recomendTurnover = turnoverValue;
  const recomendMarginPercent = choiceBusinessValue;
  const recomendSumProduct = turnoverValue - (turnoverValue * recomendMarginPercent) / 100;
  const recomendRestOfGoods = recomendSumProduct / 2;
  const recomendDuty = recomendRestOfGoods * 0.4;
  const recomendMarketingPercent = choiceBusinessMarketingText;
  const recomendMarketing = turnoverValue * (choiceBusinessMarketing / 100);
  const recomendDirty = turnoverValue - recomendSumProduct - recomendMarketing;
  const recomendFlow = recomendDirty * 0.15;
  const recomendCash = recomendDirty - recomendFlow;
  const recomendCountPeople = turnoverValue / 5000000;
  const recomendWage = recomendCash * 0.15;
  const recomendCashOwner = recomendCash - recomendWage;

  let recomendSecondTurnover = 0;
  let recomendSecondMarginPercent = 0;
  let recomendSecondSumProduct = 0;
  let recomendSecondRestOfGoods = 0;
  let recomendSecondDuty = 0;
  let recomendSecondMarketingPercent = 0;
  let recomendSecondMarketing = 0;
  let recomendSecondDirty = 0;
  let recomendSecondFlow = 0;
  let recomendSecondCash = 0;
  let recomendSecondCountPeople = 0;
  let recomendSecondWage = 0;
  let recomendSecondCashOwner = 0;
  let isZeroCondition = restOfGoodsValue > recomendRestOfGoods;
  if (isZeroCondition) {
    recomendSecondTurnover = parseFloat((restOfGoodsValue / recomendRestOfGoods) * turnoverValueSource).toFixed(2);
    recomendSecondMarginPercent = choiceBusinessValue;
    recomendSecondSumProduct = recomendSecondTurnover - (recomendSecondTurnover * recomendSecondMarginPercent) / 100;
    recomendSecondRestOfGoods = recomendSecondSumProduct / 2;
    recomendSecondDuty = recomendSecondRestOfGoods * 0.4;
    recomendSecondMarketingPercent = choiceBusinessMarketingText;
    recomendSecondMarketing = recomendSecondTurnover * (choiceBusinessMarketing / 100);
    recomendSecondDirty = recomendSecondTurnover - recomendSecondSumProduct - recomendSecondMarketing;
    recomendSecondFlow = recomendSecondDirty * 0.15;
    recomendSecondCash = recomendSecondDirty - recomendSecondFlow;
    recomendSecondCountPeople = recomendSecondTurnover / 5000000;
    recomendSecondWage = recomendSecondCash * 0.15;
    recomendSecondCashOwner = recomendSecondCash - recomendSecondWage;
  }
  const result = [
    {
      title: '1 айлық сауда(оборот)',
      label: 'Сіздің айдағы айналымыңыз',
      labelTwo: 'Сізге ұсынылған айналым',
      name: 'turnover',
      isPrice: true,
      text: 'Оптимизация бөлімінде оборотыңыз өзгермейді.',
      recomend: (form) => {
        return parseFloat(recomendTurnover).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondTurnover).toFixed(2) : 0;
      },
    },
    {
      title: 'Үстеме(наценка)',
      label: 'Сіздің үстеме бағаңыз',
      labelTwo: 'Сізге ұсынылған үстеме',
      name: 'marginPercent',
      text: (
        <>
          Наценка(маржа) клиентке жасалған ұсынысқа(услуга) қарай бірнеше түрге бөлінеді. <br />
          <br /> 1.Дистрибуциямен айналыссаңыз орташа наценка жоқ дегенде 7-10% болуы қажет.
          <br />
          <br /> 2.Оптовик болсаңыз тауар үстіне қосылатын наценка орташа есеппен жоқ дегенде 15% болуы қажет.
          <br />
          <br /> 3.Тауарыңызды бөлшек саудамен(в розницу) сататын болсаңыз наценка 30%-дан төмен болмауы қажет.
          <br />
          <br /> 4.Егер сізде өндіріс(производство) немесе БАДы(диеталық қоспалар) болса, наценка кемі 1-ге 2 есе(1:2) болуы қажет.
          <br />
          <br /> 5.Қызмет көрсетумен(услуга) айналыссаңыз , тауардың өзіндік құнын(себестоимость) шығынға(расход) қосамыз. Ал егер себестоимость-ті білмесеңіз, немесе ол ауыспалы болса, расходқа қосамыз. Келесі бөлімге көңіл бөлеміз!
          <br />
          <br /> Егер де үстінде айтылған стандарттардан саныңыз төмен болса, онда бірден барлық тауардың наценкасын (маржасын) көтермей, қолданылымдағы ходовой(паровоз) тауардың бағасын қалдырып, қалған ассортименттің бағаларына жеке-жеке (детально) көңіл бөліп көтерген дұрыс.
          <br />
          <br /> Қойылған стандарттан(пайыз мөлшерінен) екі еседен асып, көбейіп кетсе, оборотқа көңіл бөліңіз. Егер оборот көңілден шықса, баға ауыспай өз орнында қалады. Оборотты көтеру үшін әр тауарға көңіл бөліп наценкасының (маржасының) балансын табыңыз.
          <br />
          <br /> Толығырақ наценка бойынша төмендегі толығырақ видеороликтерден көре аласыздар
        </>
      ),
      recomend: (form) => {
        return parseFloat(recomendMarginPercent).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondMarginPercent).toFixed(2) : 0;
      },
    },
    {
      title: 'Тауардың өзіндік құны(себестоймость товара)',
      label: 'себестоймость товара',
      labelTwo: 'рекомендованная себестоймость товара',
      name: 'sumProduct',
      text: 'Бұл бөлімде сізге белгілі бір ұсыныс берілмейді.Тауардың өзіндік құны=Айналымдағы сомма - Үстеме(наценка)',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendSumProduct).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondSumProduct).toFixed(2) : 0;
      },
    },
    {
      title: 'Тауардың қалдығы(остаток товара)',
      label: 'Сіздің тауар қалдығыңыз',
      labelTwo: 'Ұсынылған тауар қалдығы',
      name: 'restOfGoods',
      text: (
        <>
          Остаток товара(Қалдық тауар) Көп адамда складта тауар көп болса - сауда жақсы жүреді деген қате түсінік бар. Толық түсіндірмесі маркетинг бөлімінде нақты айтылады. Қазірше мына ұсынысқа(рекомендация-ға) көңіл аударыңыз! Бұл сандар сіз бен поставщик/завод арасындағы логистикаға байланысты
          ауысуы мүмкін. <br />
          <br /> Мына формулаға көңіл аударыңыз! <br />
          <br /> Өте жақсы(Отлично) <br />
          Мысалы: 1 айлық сауда - 20 000 000 тг Наценкасы(маржасы) - 30% Өзіндік құны(себестоимость-і) - 14 000 000 тг болса: Өзіндік құнын х деп алайық: 14 000 000 тг 30-ға бөлеміз (30күн) Және 3-ке(қоймаңыздағы тауар қалдығы 3 күннен артық жатпай, сатылу қажет) көбейтеміз. Шыққан санымыз 1 400 000
          тг-ге тең. Остаток товара(Қалдық тауар) 1 400 000 тг-ге шамасында болуы қажет. <br />
          <br /> Бұл сандарға витринадағы тауардың құны қосылмайды. 3 күндік сатылымдағы тауар + витрина болып саналады. Мысалы: 1 400 000+2 000 000=3 400 000 тг <br />
          <br /> Жақсы (удовлетворительно) <br />
          Мысалы: 1 айлық сауда - 20 000 000 тг Наценкасы(маржасы) - 30% Өзіндік құны(себестоимость-і) - 14 000 000 тг болса: 1 400 000-ды 3-ке бөліп 7 күнге көбейтсек = 3300000тг шамасында болса, жағдайыңыз жақсы. <br />
          <br /> Нашар (плохо) 15-тен жоғары болса жаман Қойма деген сөздің мағынасы тауардың қалмауы(тауар қойма) <br />
          <br />
          Компанияның табысқа кеңелуі=тауардың дұрыс алынуы
        </>
      ),
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendRestOfGoods).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondRestOfGoods).toFixed(2) : 0;
      },
    },
    {
      title: 'Оптовиктердің/поставщиктердің алдындағы қарыз(долг перед постащиками)',
      label: 'Сіздің қарызыңыз',
      labelTwo: 'Ұсынылған қарыз',
      name: 'duty',
      text: (
        <>
          Жеткізушінің(поставщик) алдындағы қарыз. <br />
          <br /> Көп компанияның кассовый разрыв болуының себебі:
          <br /> • Қарызға алынған тауардың тым көп алынуы
          <br /> • Тауардың санының жүйелі болмауы <br />
          <br /> Мысалы: 10 млн-ға тауар қарызға поставщиктен алдың. Келісім бойынша 14 күн ішінде тауар бағасын ақшалай қайтару қажетсің. Бірақ сен ол уақытта тек 5 млн тг-ге тауар өткізе алдың. Қалған 5 000 000 тг ақшаны қайдан аласың?! Әрине, жұмысшылардың айлығынан аласың; аренданың ақшасынан
          аласың; басқа тауар беретін поставщиктың ақшасын беріп қоясың; досыңыздан қарызға ақша алып қашып жүресің немесе қайта кредитке батасың. <br />
          <br /> Қорықпаңыз! Бұл жағдай 95% компанияда орын алады. <br />
          <br /> Өте жақсы: Тауарды қарызға алмай, тек наличкамен жұмыс жасау.
          <br />
          <br /> Жақсы: Поставщик алдындағы қарыз складтағы остаток товара-дан 40% аспау қажет.
          <br />
          <br /> Жаман: Поставщик алдындағы қарыз складтағы тауардан 60%-дан асып жатса мемлекеттен қашыңыз. Кассовый разрыв алыста емес!
          <br />
          <br /> Егер де сонда да қарызыңыз нормадан асып кетсе, бұны шешудің 5 жолы бар:
          <br />
          <br /> • Іштегі ассортиментпен жұмыс жасау; Ходовой тауарға тиіспей, қалған ассортиментке акция жариялап, келген пайдаға қарызды жабу;
          <br /> • Алдыңғы бөлімдегі(тауардың қалдығы) стандартқа көз жүгіртіп, сол стандарттан артылып қалған ходовой тауарды сатып, қарызды жабу;
          <br /> • Алдыңғы стандартқа қарап(тауардың қалдығы), складта жатқан тауарды бірнеше филиал ашу арқылы(масштабқа шығу) автоматты түрде қайта нормаға келу;
          <br /> • Маркетинг арқылы(маркетинг бөлімінде нақты айтамыз) сауда көтерудің жолын табу;
          <br /> • Реинвестиция арқылы (реинвестиция бөлімінде нақты айтатын боламыз).
        </>
      ),
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendDuty).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondDuty).toFixed(2) : 0;
      },
    },
    {
      title: 'Маркетинг в проценте',
      label: 'Сіздің маркетингтік шығындарыңыз',
      labelTwo: 'Ұсынылған маркетингтік шығындар',
      name: 'marketingPercent',
      recomend: (form) => {
        return recomendMarketingPercent;
      },
      recomendSecond: (form) => {
        return isZeroCondition ? recomendMarketingPercent : 0;
      },
    },
    {
      title: 'Маркетинг в тенге',
      label: 'Сіздің маркетингтік шығындарыңыз',
      labelTwo: 'Ұсынылған маркетингтік шығындар',
      name: 'marketing',
      text: (
        <>
          Маркетинг <br /> Маркетинг(реклама) дегеніміз не?
          <br />
          <br /> 2020-ға дейін нарықтың сұранысы басқа еді(магазинды ашып, тауарды салып, жай ғана күтсеңіз жеткілікті еді). 2020-дан бастап повторный клиент(тауарынызды екі немесе одан да көп реттен тұтынушы адам) қатты азайды. Себебі конкуренттер сіздің ойыңыздағы немесе оффлайн жасап жатқан
          ұсынысыңызды әлеуметтік желі арқылы кең таратып ұсынып жатыр.
          <br />
          <br /> Саудаңыз ойдағыдай жүру үшін қаражатыңызды астындағы берілген маркетинг стандарттары бойынша жарату абзал.
          <br />
          <br /> • Егер алып-сату саудасымен айналыссаңыз маркетингке обороттың 2,5-5% аралығында қаражат бөлгеніңіз дұрыс.
          <br />
          <br /> • Егер тауарды өндірумен айналыссаңыз(производство), обороттың 10-20%-ын салу абзал.
          <br />
          <br /> • Егер консалтингпен, услугамен немесе БАД-ымен айналыссаңыз, қаражатыңыздың 10-30%-ын маркетингке салғаныңыз дұрыс.
          <br />
          <br /> Кәсіпкерлер арасында екі жағдай жиі кездеседі:
          <br />
          <br /> • Маркетингке дұрысқанды қаражат бөлмейді
          <br />
          <br /> • Бөлген қаражатты ұқыпсыз/креативсіз жұмсайды
        </>
      ),
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendMarketing).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondMarketing).toFixed(2) : 0;
      },
    },
    {
      title: 'Грязная прибыль',
      label: 'Грязная прибыль',
      labelTwo: 'Ұсынылған маркетингтік шығындар',
      name: 'dirty',
      text: <>Грязная прибыль = оборот - маркетинг - тауардың өзіндік құны</>,
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendDirty).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondDirty).toFixed(2) : 0;
      },
    },
    {
      title: 'Расход',
      label: 'Ваш расход',
      labelTwo: 'Рекомендованный расход',
      name: 'flow',
      text: <>Кэш компании дегеніміз = оборот - тауардың өзіндік құны - маркетинг - рассход</>,
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendFlow).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondFlow).toFixed(2) : 0;
      },
    },
    {
      title: 'Кэш компании',
      label: 'Сіздің команданың жалақысы',
      labelTwo: 'Команданың ұсынылған жалақысы',
      name: 'cash',
      text: (
        <>
          Компанияның табысы(КЭШ компании) Компанияда болатын басты проблемалардың бірі - ол иесіне түсетін таза табыстың 100%-ын түгелімен өзі жұмсауы немесе компанияға қайта түгел салып жіберуі(бұл фатальная ошибка). <br />
          <br /> Бұның шешімі былай:
          <br /> • Егер де компания өсу/даму үстінде тұрса, таза табыстың 70%-ын компанияға, қалған 30%-ы қалтаңызға түсу қажет
          <br /> • Егер компания өз даму шегіне жеткенін байқасаңыз, керісінше 30%-ын компанияға қайта құйып, қалған 70%-ын өз бақытыңызға жұмсаңыз. Компания мен сіздің араңыздағы бюджеттің пропорциясы 100-0 немесе 0-100 болмауы қажет.
        </>
      ),
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendCash).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondCash).toFixed(2) : 0;
      },
    },

    {
      title: 'Команданын саны',
      label: 'Сіздің команданың жалақысы',
      labelTwo: 'Команданың ұсынылған жалақысы',
      name: 'countPeople',
      text: <>Топ компаниялардың стандарттарына қарайтын болсақ , әрбір жұмысшы кемінде компанияға 5000000тг алып келуі қажет(Мысалы оборот 2500000тг болса компанияда жумысшылар саны оптималды түрде 5 адам болуы қажет)</>,
      recomend: (form) => {
        return parseFloat(recomendCountPeople).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondCountPeople).toFixed(2) : 0;
      },
    },
    {
      title: 'Фонд оплата труда',
      label: 'Сіздің командалық бонустарыңыз',
      labelTwo: 'Команданың ұсынылған бонустары',
      name: 'wage',
      text: (
        <>
          Команданың жалақысы Көп компаниялар (компания финансисттері) көп жағдайда айлық жалақыны расходқа қосып жатады. Бұл қате процесс. Себебі: Көп компанияларда жұмысшылардың айлық жалақысын тұрақты(фиксированный) қылады немесе оборот пайызын бөліп береді. Ал бұл компанияның банкрот болуының
          тікелей жолы(Совет үкіметі дәл осылай құлдыраған) Компанияңызда қазіргі уақытта осы проблема болса онда сіз 100% операционканы(компания проблемаларын) мойныңызға артып алғансыз. Компания иесінің басты мақсаты - компанияның сыртында тек стратегия мен даму жолын
          көрсету(дережировать),операционкадан босау. Ал команданың мақсаты - сіз көрсеткен жолмен операционкадағы бүкіл жұмысты бітіріп, сізді алдыға итермелеу. Ол үшін: Компанияңыздың табысының 15% -нан команданың общий жалақысы төмен болса, онда командаңызда дамуға мотивациясы төмен/жеткіліксіз.
          Егер де 30% -дан жоғары болса, онда командаңыздың потенциалын толыққанды қолданып жатқан жоқсыз.
          <br />
          <br />
          Компаниялардың тағы бір қателіктерінің бірі әр командаға әртүрлі процентпен жалақы беру. Қазіргі уақытта жалғыздың шаңы шықпайды( бізге боксердың қажеті жоқ, бізге футбол командасы қажет). Бұл жағдайдың қандай шешімі бар?!
          <br /> -Компанияның таза табысының 15%-ын бүкіл командаға бөліп бересіз(айлық жалақы ретінде). Бұл жүйе компанияңыздың қандай мәселелерін шешеді?!
          <br /> • Команда өз-өзін басқарады. Себебі, команда мүшесі жұмысқа келмесе немесе кешігіп жатса, сол келмей қалған адамның табысы келгендердердің арасында бөлініп кетеді(бұрын команда келмей қалған мүшесі үшін ренжитін. Біздің жағдайда керісінше қуанады, өйткені табысы өзара бөлініп
          қалғандарына таралады).
          <br /> • Закуп-ыңыз автоматты түрде жүйеленеді, себебі сіз бюджетті бұрыңғыдай есепті оңды-солды бере бермейсіз. Бұдан былай тауардың себестоимость-ын ғана бөліп отырасыз. Егер де бюджетті мөлшерден артық бөлсеңіз, барлығының алатын ақшасына зиян тиеді(компанияның/сіздің/команданың ақшасы
          азаяды).
          <br /> • Расход өз мөлшерінен асып немесе азайса, бұл да тікелей бүкіл жүйеге зиянын тигізеді.
          <br /> • Сауда көтерілсе, ақша көтеріледі. Ал сауда керісінше түссе, команданың да табысы түседі(вовлеченность болады).
          <br />
          <br /> Яғни осы төрт мәселені жүйелей отырып, бұрыңғы операционкаға жұмсайтын уақытыңыздың 80%-ын өз мойнына алады. Ал қалған 20%-ын цифра арқылы өзіңіз анық басқара аласыз.
        </>
      ),
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendWage).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondWage).toFixed(2) : 0;
      },
    },
    {
      title: 'Кэш владелца',
      label: 'Сіздің командалық бонустарыңыз',
      labelTwo: 'Команданың ұсынылған бонустары',
      name: 'cashOwner',
      isPrice: true,
      recomend: (form) => {
        return parseFloat(recomendCashOwner).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? parseFloat(recomendSecondCashOwner).toFixed(2) : 0;
      },
    },
    // {
    //   title: 'Команда бонустары',
    //   label: 'Сіздің командалық бонустарыңыз',
    //   labelTwo: 'Команданың ұсынылған бонустары',
    //   labelThird: 'Бонусы за месяц',
    //   labelFour: 'Бонасы за обучение за квартал ',
    //   labelFive: 'Бонус за год',
    //   name: 'cashCommand',
    //   isPrice: true,
    //   recomend: (form) => {
    //     return (parseInt(form.getValues('cash')) * 0.15).toFixed(2);
    //   },
    //   recomendSecond: (form) => {
    //     return (parseInt(form.getValues('cash')) * 0.5).toFixed(2);
    //   },
    //   recomendThird: (form) => {
    //     return (parseInt(form.getValues('cash')) * 0.5 * 3).toFixed(2);
    //   },
    //   recomendFour: (form) => {
    //     return (parseInt(form.getValues('cash')) * 0.05 * 12).toFixed(2);
    //   },
    // },
    {
      title: 'Таза пайда',
      label: 'Сіздің таза пайдаңыз',
      labelTwo: 'Болу керек таза пайда',
      name: 'netProfit',
      isPrice: true,
      recomend: (form) => {
        return (parseInt(form.getValues('cash')) * 0.7).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? (parseInt(form.getValues('cash')) * 0.7).toFixed(2) : 0;
      },
    },
    {
      title: 'Реинвест',
      label: 'Ваш Реинвест',
      labelTwo: 'Рекомендованный реинвест',
      name: 'reinvest',
      isPrice: true,
      recomend: (form) => {
        return (parseInt(form.getValues('cash')) * 0.7 * 0.7).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? (parseInt(form.getValues('cash')) * 0.7 * 0.7).toFixed(2) : 0;
      },
    },
    {
      title: 'Кэшаут',
      label: 'Ваш кэшаут',
      labelTwo: 'Рекомендованный кэшаут',
      name: 'cashOut',
      isPrice: true,
      recomend: (form) => {
        return (parseInt(form.getValues('cash')) * 0.7 * 0.3).toFixed(2);
      },
      recomendSecond: (form) => {
        return isZeroCondition ? (parseInt(form.getValues('cash')) * 0.7 * 0.3).toFixed(2) : 0;
      },
    },
  ];
  return result;
};

const CourseStart = () => {
  const {
    activeChapter,
    getNameBusiness: { data: getNameBusinessData },
    getTypeBusiness: { data: getTypeBusinessData },
    getTypeOfSale: { data: getTypeOfSaleData },
    getWhereSale: { data: getWhereSaleData },
  } = useSelector((state) => state.app);
  const {
    authUser: { data: auth },
    getResult: { data: getResultData, loading: getResultLoading },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const pageForm = useForm();
  console.log(pageForm.getValues());
  const [dataResult, setDataResult] = useState({});
  const [dataStep, setDataStep] = useState(dataStepDefault);
  const calcData = () => {
    // const turnover = pageForm.getValues('turnover');
    // const margin = pageForm.getValues('margin');
    // const marginPercent = pageForm.getValues('marginPercent');
    // const restOfGoods = pageForm.getValues('restOfGoods');
    // const duty = pageForm.getValues('duty');
    // const marketing = pageForm.getValues('marketing');
    // const marketingPercent = pageForm.getValues('marketingPercent');
    // const dirty = pageForm.getValues('dirty');
    // const constFlow = pageForm.getValues('constFlow');
    // const varFlow = pageForm.getValues('varFlow');
    // const otherFlow = pageForm.getValues('otherFlow');
    // const flow = pageForm.getValues('flow');
    // const cash = pageForm.getValues('cash');
    // const cashCommand = pageForm.getValues('cashCommand');
    // const countPeople = pageForm.getValues('countPeople');
    // const directSalary = pageForm.getValues('directSalary');
    // const countTalentsPeople = pageForm.getValues('countTalentsPeople');
    // const talentPeopleSalary = pageForm.getValues('talentPeopleSalary');
    // const countKpiPeople = pageForm.getValues('countKpiPeople');
    // const directBonus = pageForm.getValues('directBonus');
    // const talentPeopleSalaryYear = pageForm.getValues('talentPeopleSalaryYear');
    // const netProfit = pageForm.getValues('netProfit');
    // const reinvest = pageForm.getValues('reinvest');
    // const cashOut = pageForm.getValues('cashOut');
    return pageForm.getValues();
  };
  const myRef = useRef(null);
  console.log(pageForm.formState.errors);
  const [activeStep, setActiveStep] = useState(2);
  const activeStepRef = useRef();
  const activeChapterRef = useRef();
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);
  useEffect(() => {
    activeChapterRef.current = activeChapter;
  }, [activeChapter]);
  const onSubmit = () => {
    setTimeout(() => {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
    let nextStep = activeStep + 1;
    if (dataStep[nextStep]?.chapter) {
      nextStep++;
      dispatch(setActiveChapter(activeChapter + 1));
    }

    setActiveStep(nextStep);
    calcData();
  };
  useEffect(() => {
    dispatch(getResult(auth?.id));
    dispatch(getNameBusiness());
    dispatch(getTypeBusiness());
    dispatch(getTypeOfSale());
    dispatch(getWhereSale());
    window.addEventListener('unload', resetPage);

    return () => {
      window.removeEventListener('unload', resetPage);
      resetPage();
    };
  }, []);

  const resetPage = () => {
    dispatch(
      upsertResult({
        userId: auth?.id,
        step: activeStepRef.current,
        chapter: activeChapterRef.current,
        dataCourse: pageForm.getValues(),
      }),
    );
  };
  useEffect(() => {
    if (getResultData) {
      pageForm.reset(JSON.parse(getResultData?.data));
      dispatch(setActiveChapter(getResultData?.chapter));
      setActiveStep(getResultData?.step);
      setTimeout(() => {
        myRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [getResultData]);

  useEffect(() => {
    if (getNameBusinessData && getTypeBusinessData && getTypeOfSaleData && getWhereSaleData) {
      let dataStepUpdate = dataStep;
      dataStepUpdate[5].fields[7].options = getTypeBusinessData?.map((itemTypeBusiness) => ({
        label: itemTypeBusiness?.name,
        options: getNameBusinessData?.filter((itemNameBusiness) => itemNameBusiness?.typeBusinessId == itemTypeBusiness?.id)?.map((itemNameBusiness) => ({ margin: itemTypeBusiness?.margin, value: itemNameBusiness?.id, label: itemNameBusiness?.name })),
      }));
      dataStepUpdate[5].fields[8].options = getTypeOfSaleData?.map((itemTypeOfSale) => ({ value: itemTypeOfSale?.id, label: itemTypeOfSale?.name }));
      dataStepUpdate[5].fields[9].options = [
        { label: 'Онлайн', options: getWhereSaleData?.filter((itemWhereSale) => itemWhereSale?.isOnline)?.map((itemWhereSale) => ({ label: itemWhereSale?.name, value: itemWhereSale?.id })) },
        { label: 'Оффлайн', options: getWhereSaleData?.filter((itemWhereSale) => !itemWhereSale?.isOnline)?.map((itemWhereSale) => ({ label: itemWhereSale?.name, value: itemWhereSale?.id })) },
      ];
      setDataStep(dataStepUpdate);
      console.log(dataStepUpdate);
    }
  }, [getNameBusinessData, getTypeBusinessData, getTypeOfSaleData, getWhereSaleData]);
  console.log(activeStep);
  const matches = useMediaQuery('(min-width:1100px)');
  return (
    <>
      {!getResultLoading && auth?.activeCourse && (
        <Box sx={{ paddingBottom: '44px', marginBottom: '40px' }}>
          <Box sx={{ display: 'flex', flexDirection: { mob: 'column', desk: 'row' }, alignItems: { mob: 'start', desk: 'center' } }}>
            <Box sx={{ marginBottom: { mob: '8px', desk: '0' }, fontWeight: '600', fontSize: { mob: '20px', desk: '24px' }, marginRight: { mob: '20px', desk: '25px' } }}>Аудит бизнеса</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#4282E1' }}>
              <img src="/img/clock.svg" style={{ marginRight: '5px', ...(!matches && { width: '15px' }) }} />
              150 мин.
            </Box>
          </Box>
          <Box sx={{ marginTop: '24px', paddingBottom: '24px', borderBottom: '1px solid #E0E0E0', marginBottom: '24px', lineHeight: '22px' }}>
            Сәлем Айбек! Мен-Бақтияр Өсербекұлы, 20–жылдық тәжірибесі бар бизнес-практик қарапайым тілмен айтқанда бизнестің механигімін және жүйелі басқарудан жетекшімін. Сізді біздің платформада қарсы алғаныма қуаныштымын! Сізбен диагностиканы бастамастан бұрын мына видеоны толық қарап өтіңіз.
          </Box>
          {dataStep?.map((item, itemIndex) => {
            return (
              <div
                style={{
                  opacity: itemIndex < activeStep ? '1' : '0',
                  transition: 'all .4s',
                  transitionDelay: '.4s',
                  visibility: itemIndex < activeStep ? 'visible' : 'hidden',
                }}>
                <AnimateHeight duration={400} height={itemIndex < activeStep ? 'auto' : 0}>
                  <div> {getTypeComponents(item, pageForm, itemIndex < activeStep, activeStep, itemIndex)}</div>
                </AnimateHeight>
              </div>
            );
          })}
          {dataStep?.length > activeStep && (
            <Box sx={{ width: { mob: '100%', desk: 'calc(100% - 375px)' }, position: 'fixed', padding: '0 28px 35px 28px', bottom: '0px', right: '0px', background: '#FBFBFB' }}>
              <button style={{ border: 'none', color: '#fff', background: '#4282E1', borderRadius: '5px', height: '44px', width: '100%', fontSize: '16px', cursor: 'pointer' }} onClick={pageForm.handleSubmit(onSubmit)}>
                Жалғастыру
              </button>
            </Box>
          )}

          {/* <Result {...calcData()} /> */}
          {activeStep == dataStep?.length && (
            <>
              <Box sx={{ fontSize: '24px', marginTop: '30px', fontWeight: '600', textAlign: 'center' }}>Оптимизация</Box>
              {getCheckupData(pageForm)?.map((itemResult) => (
                <Box sx={{ marginTop: { mob: '20px', desk: '40px' }, padding: { mob: '24px 6px', desk: '24px 24px 24px 50px' }, borderRadius: '12px', border: '1px solid rgba(66, 130, 225, 0.15)', position: 'relative' }}>
                  <Box>
                    <Box sx={{ fontWeight: '600', fontSize: '20px', marginBottom: '25px' }}> {itemResult?.title}</Box>
                    <Box sx={{ display: { mob: 'none', desk: 'block' }, position: 'absolute', top: '15px', left: '22px', height: 'calc(100% - 30px)', width: '4px', borderRadius: '4px', background: '#4282E1' }}></Box>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { mob: '1fr', desk: '1fr 1fr' }, gap: '25px' }}>
                    <label class={clsx('input-wrap')}>
                      <div className="input-lable input-label-required">{itemResult?.label}</div>
                      <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.name == 'cashCommand' ? 0 : pageForm.getValues(itemResult?.name)} />
                    </label>
                    <Box>
                      <label class={clsx('input-wrap')}>
                        <div className="input-lable input-label-required">{itemResult?.labelTwo}</div>

                        <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomend(pageForm)} />
                      </label>
                      {itemResult?.name == 'cashCommand' && (
                        <>
                          {' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelThird}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendSecond(pageForm)} />
                          </label>
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFour}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendThird(pageForm)} />
                          </label>{' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFive}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendFour(pageForm)} />
                          </label>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ padding: '15px 18px', marginTop: '25px', background: 'rgba(66, 130, 225, 0.15)', borderRadius: '6px' }}> {itemResult?.text || ''}</Box>
                </Box>
              ))}
              <Box sx={{ fontSize: '24px', marginTop: '30px', fontWeight: '600', textAlign: 'center' }}>Масштобирование</Box>
              {getCheckupData(pageForm, true)?.map((itemResult) => (
                <Box sx={{ marginTop: { mob: '20px', desk: '40px' }, padding: { mob: '24px 6px', desk: '24px 24px 24px 50px' }, borderRadius: '12px', border: '1px solid rgba(66, 130, 225, 0.15)', position: 'relative' }}>
                  <Box>
                    <Box sx={{ fontWeight: '600', fontSize: '20px', marginBottom: '25px' }}> {itemResult?.title}</Box>
                    <Box sx={{ display: { mob: 'none', desk: 'block' }, position: 'absolute', top: '15px', left: '22px', height: 'calc(100% - 30px)', width: '4px', borderRadius: '4px', background: '#4282E1' }}></Box>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { mob: '1fr', desk: '1fr 1fr 1fr' }, columnGap: '25px' }}>
                    <Box sx={{}}>
                      <label class={clsx('input-wrap')}>
                        <div className="input-lable input-label-required">{itemResult?.label}</div>
                        <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.name == 'cashCommand' ? 0 : pageForm.getValues(itemResult?.name)} />
                      </label>
                    </Box>
                    <Box sx={{ marginTop: { mob: '25px', desk: '0' } }}>
                      <label class={clsx('input-wrap')}>
                        <div className="input-lable input-label-required">{itemResult?.labelTwo}</div>

                        <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomend(pageForm)} />
                      </label>
                      {itemResult?.name == 'cashCommand' && (
                        <>
                          {' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelThird}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendSecond(pageForm)} />
                          </label>
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFour}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendThird(pageForm)} />
                          </label>{' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFive}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendFour(pageForm)} />
                          </label>
                        </>
                      )}
                    </Box>
                    <Box sx={{ marginTop: { mob: '25px', desk: '0' } }}>
                      <label class={clsx('input-wrap')}>
                        <div className="input-lable input-label-required">{itemResult?.labelTwo}</div>

                        <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendSecond(pageForm)} />
                      </label>
                      {itemResult?.name == 'cashCommand' && (
                        <>
                          {' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelThird}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendSecond(pageForm)} />
                          </label>
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFour}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendThird(pageForm)} />
                          </label>{' '}
                          <label class={clsx('input-wrap')} style={{ marginTop: !matches ? '25px' : '10px', display: 'block' }}>
                            <div className="input-lable input-label-required">{itemResult?.labelFive}</div>
                            <NumericFormat {...(itemResult?.isPrice && { suffix: ' тг', thousandSeparator: ',' })} className="input-custom" disabled={true} value={itemResult?.recomendFour(pageForm)} />
                          </label>
                        </>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ minHeight: '57px', padding: '15px 18px', marginTop: '25px', background: 'rgba(66, 130, 225, 0.15)', borderRadius: '6px' }}>{itemResult?.text || ''} </Box>
                </Box>
              ))}
              {dataVideoResult?.map((itemVideo) => (
                <Box sx={{ marginTop: '20px' }}>{getTypeComponents(itemVideo)}</Box>
              ))}
            </>
          )}

          <Box ref={myRef}></Box>
        </Box>
      )}
    </>
  );
};

export default CourseStart;
