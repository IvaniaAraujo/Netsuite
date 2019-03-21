/**
* CLIENTE: NUSSED
* NOME DA CUSTOMIZAÇÃO: RELATÓRIO DANFE
* TIPO DO SCRIPT: Evento de usuário
* DESENVOLVEDOR: IVANIA
* DATA DE CRIAÇÃO: 19/12/2018
* DATA DA ULTIMA ATUALIZAÇÃO:
* QUEM ATUALIZOU:
**/

function nf_danf_at_item(name,type,contaId){

    var invoice = nlapiGetNewRecord();

  //verifica se o campo criade de esta vazio para fazer a busca
    if(invoice.getFieldValue('createdfrom') != null){

        var filter = [];
        filter.push(new nlobjSearchFilter('custcol_f5_lot_numbers', null,  'isnotempty')); //somente se o numero do lote não esta vazio
        filter.push(new nlobjSearchFilter('createdfrom', null,'anyof', invoice.getFieldValue('createdfrom')));

        var column = [];
        column.push(new nlobjSearchColumn('custcol_f5_lot_numbers'));
        
        var search = nlapiSearchRecord('itemfulfillment', null, filter, column);

        for(var i=0; search != null && i < search.length; i++){

            var lot_number = search[i].getValue('custcol_f5_lot_numbers');

            for(var j = 1; j<= invoice.getLineItemCount('item'); j++){

                var item_id = invoice.getLineItemValue('item','item',j);
               
                var type_item = invoice.getLineItemValue('item', 'itemtype', j);

                if(type_item == 'InvtPart'){
                    var description_item = nlapiLookupField('inventoryitem', item_id, 'description');
                }
                else if(type_item == 'Kit' ){
                    var description_item = nlapiLookupField('kititem', item_id, 'description');
                }
                else if(type_item == 'Group'){
                    var description_item = nlapiLookupField('itemgroup', item_id, 'description');
                }           
                else if(type_item == 'Assembly'){
                    var description_item = nlapiLookupField('assemblyitem', item_id, 'description');
                }
                else if(type_item == 'Description'){
                    var description_item = nlapiLookupField('descriptionitem', item_id, 'description');
                }
                else if(type_item == 'Discount'){
                    var description_item = nlapiLookupField('discountitem', item_id, 'description');
                }
                else if(type_item == 'DwnLdItem'){
                    var description_item = nlapiLookupField('downloaditem', item_id, 'description');
                }
            
                if(lot_number){
                    invoice.selectLineItem('item',j);
                    invoice.setCurrentLineItemValue('item', 'description', description_item +' '+ (lot_number ? '\nLote: ' + lot_number : ''));
                    invoice.commitLineItem('item');
                }

            }
        }
    }
}
