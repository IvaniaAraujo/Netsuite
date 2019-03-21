/**
* CLIENTE: NUSSED
* NOME DA CUSTOMIZAÇÃO: RELATÓRIO DANFE
* TIPO DO SCRIPT: Evento de usuário
* DESENVOLVEDOR: IVANIA
* DATA DE CRIAÇÃO: 19/12/2018
* DATA DA ULTIMA ATUALIZAÇÃO:
* QUEM ATUALIZOU:
**/

function afterSubmit(type){//ATUALIZAR INFORMAÇÕES ADICIONAIS NA DANFE

  	 var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());

  	 if (nlapiGetRecordType() == 'transferorder'){
  	 	 var transfer_order = record.getFieldValue('tranid');
	     var nota_fiscal = record.getFieldValue('custbody_enl_fiscaldocnumber');
	     if(type != 'edit'){
	     	var infoAdicionais = (transfer_order ? 'Pedido de Transferência: ' + transfer_order : '') + " " + (nota_fiscal ? "Nota Fiscal: " + nota_fiscal : '');
	     	record.setFieldValue('custbody_enl_legaltext', infoAdicionais);
	     }
  	 }else if(nlapiGetRecordType() == 'salesorder'){
		     var origem = record.getFieldValue('createdfrom');//transação de origem
		     var vendedor = record.getFieldText('salesrep');//nome do representante de venda
		     var venda = record.getFieldValue('tranid');
		     var nota_fiscal = record.getFieldValue('custbody_enl_fiscaldocnumber');

		     if(type != 'edit'){
		     	var infoAdicionais = (venda ? 'Pedido de Venda: ' + venda : '') + " " + (vendedor ? "Representante: " + vendedor : '');
		     	record.setFieldValue('custbody_enl_legaltext', infoAdicionais);
		     }	
		     
  	 }else if(nlapiGetRecordType() ==  'purchaseorder'){
	    	var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
	    	var infoAdicionais = record.getFieldValue('custbody_enl_legaltext');
		    
		    if(type != 'edit'){    
		    	record.setFieldValue('custbody_enl_legaltext', ' Pedido de compra:' + ' ' + record.getFieldValue('tranid'));
		    } 

    }else if(nlapiGetRecordType() ==  'invoice'){
	     	var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
	  		var fatura = record.getFieldValue('tranid');//número da fatura
	    
		    var infoAdicionais = record.getFieldValue('custbody_enl_legaltext');

		    if(type != 'edit'){
		    	record.setFieldValue('custbody_enl_legaltext', infoAdicionais + (' Fatura:' + ' ' + record.getFieldValue('tranid')));
		    }
	        //nlapiSubmitRecord(record, true);
    }else if(nlapiGetRecordType() ==  'vendorbill'){
    		var info_adicionais = record.getFieldValue('custbody_enl_legaltext');
		    var nota_fiscal = record.getFieldValue('custbody_enl_fiscaldocnumber');
			var infoAdicionais = info_adicionais + ' ' + (nota_fiscal ? "Fatura: " + nota_fiscal : '');
		    
		    if(type != 'edit'){
		       record.setFieldValue('custbody_enl_legaltext', infoAdicionais);
			}
    }
   
     nlapiSubmitRecord(record, true);
}