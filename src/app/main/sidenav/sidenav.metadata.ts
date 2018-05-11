

export const superAdminMetaData = [
    { isHeader : true, header : 'master data' , 
      list :[
        { title : 'minister', routeUrl : 'minister', icon :'storage' }
      ] 
    },
    { isHeader : true, header : 'certificates' , 
      list :[
        { title : 'baptism', routeUrl : 'baptism' ,icon :'view_list' },
        { title : 'confirmation', routeUrl : 'confirmation', icon :'view_list' },
        { title : 'death', routeUrl : 'death', icon :'view_list' },
        { title : 'marriage', routeUrl : 'marriage', icon :'view_list' }
      ] 
    },
    {
      isHeader : true, header : 'services',
      list :[
        {title : 'categories' , routeUrl : 'services/categories' , icon : 'format_list_bulleted'},
        {title : 'type' , routeUrl : 'services/type' , icon : 'format_list_bulleted'},
      ]
    },
    {
      isHeader : true, header : 'sales',
      list :[
        {title : 'pos' , routeUrl : 'sales/pos' , icon : 'monetization_on'},
        {title : 'sales list' , routeUrl : 'sales/list' , icon : 'library_books'},
        {title : 'reports' , routeUrl : 'sales/report' , icon : 'library_books'},
      ]
    },
    {
      isHeader : true, header : 'expenses',
      list :[
        {title : 'categories' , routeUrl : 'expenses/categories' , icon : 'format_list_bulleted'},
        {title : 'type' , routeUrl : 'expenses/type' , icon : 'format_list_bulleted'},
        {title : 'expense list' , routeUrl : 'expenses/list' , icon : 'monetization_on'},
        {title : 'reports' , routeUrl : 'expenses/report' , icon : 'library_books'},
      ]
    }
];

export const recordMetaData = [
    { isHeader : true, header : 'master data' , 
    list :[
      { title : 'minister', routeUrl : 'minister', icon :'storage' }
    ] 
  },
  { isHeader : true, header : 'certificates' , 
    list :[
      { title : 'baptism', routeUrl : 'baptism' ,icon :'view_list' },
      { title : 'confirmation', routeUrl : 'confirmation', icon :'view_list' },
      { title : 'death', routeUrl : 'death', icon :'view_list' },
      { title : 'marriage', routeUrl : 'marriage', icon :'view_list' }
    ] 
  }
];

export const accountingMetaData = [
  {
    isHeader : true, header : 'services',
    list :[
      {title : 'categories' , routeUrl : 'services/categories' , icon : 'format_list_bulleted'},
      {title : 'type' , routeUrl : 'services/type' , icon : 'format_list_bulleted'},
    ]
  },
  {
    isHeader : true, header : 'sales',
    list :[
      {title : 'pos' , routeUrl : 'sales/pos' , icon : 'monetization_on'},
      {title : 'sales list' , routeUrl : 'sales/list' , icon : 'library_books'},
      {title : 'reports' , routeUrl : 'sales/report' , icon : 'library_books'},
    ]
  },
  {
    isHeader : true, header : 'expenses',
    list :[
      {title : 'categories' , routeUrl : 'expenses/categories' , icon : 'format_list_bulleted'},
      {title : 'type' , routeUrl : 'expenses/type' , icon : 'format_list_bulleted'},
      {title : 'expense list' , routeUrl : 'expenses/list' , icon : 'monetization_on'},
      {title : 'reports' , routeUrl : 'expenses/report' , icon : 'library_books'},
    ]
  }
];