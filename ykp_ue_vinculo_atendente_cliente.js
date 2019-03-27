/*
CLIENTE: FABERG
CUSTOMIZAÇÃO: INSERÇÃO DE TODOS OS ATENDENTES PARA CLIENTES CRIADOS NOVOS
TIPO: USER EVENT
DESENVOLVEDOR: ivania.nascimento
DATA DE CRIAÇÃO: 26/03/2019
DATA ULTIMA ALTERAÇÃO: 
ULTIMO DESENVOLVEDOR QUE EDITOU: 
*/

function beforeLoad(type){

	if(type == 'edit'){
		var atendentefilho = nlapiGetFieldValue('partner');	
		var teste = nlapiGetFieldValue('')
		var filters = [];
		//filters.push(new nlobjSearchFilter('partner',null,'isempty'));
		filters.push(new nlobjSearchFilter('custentity61', null, 'is', 31617));
      
		var columns = [];
		columns.push(new nlobjSearchColumn('entityid'));	

		var searhResults = nlapiSearchRecord('partner',null,filters,columns);

		for(var i=0;searhResults != null && i < searhResults.length; i++){
			
			var vinculo = searhResults[i].getValue('entityid');

			//nlapiSetFieldValue('partner', vinculo);

			nlapiSelectNewLineItem('partner');	
			nlapiSetCurrentLineItemValue('partner', vinculo,true,true);	
			nlapiCommitLineItem('partner');
			
		}

	}


}