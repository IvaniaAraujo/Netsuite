
/**
* CLIENTE: NUSSED
* NOME DA CUSTOMIZAÇÃO: RELATÓRIO DANFE
* TIPO DO SCRIPT: Evento de usuário
* DESENVOLVEDOR: IVANIA
* DATA DE CRIAÇÃO: 19/12/2018
* DATA DA ULTIMA ATUALIZAÇÃO:
* QUEM ATUALIZOU:
**/


function nf_danf_cobranca(){//ATUALIZAR INFORMAÇÕES ADICIONAIS NA DANFE
  
     var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
     var info_adicionais = record.getFieldValue('custbody_enl_legaltext');
     var nota_fiscal = record.getFieldValue('custbody_enl_fiscaldocnumber');

     var infoAdicionais = info_adicionais + ' ' + (nota_fiscal ? "Fatura: " + nota_fiscal : '');
    
     record.setFieldValue('custbody_enl_legaltext', infoAdicionais);
   
     nlapiSubmitRecord(record, true);
}