/**
* CLIENTE: NUSSED
* NOME DA CUSTOMIZAÇÃO: RELATÓRIO DANFE
* TIPO DO SCRIPT: Evento de usuário
* DESENVOLVEDOR: IVANIA
* DATA DE CRIAÇÃO: 19/12/2018
* DATA DA ULTIMA ATUALIZAÇÃO:
* QUEM ATUALIZOU:
**/

function nf_danf_at_item_transfer(type){

     if(type == 'create'){

        var transf = nlapiGetNewRecord();

        for(var i = 1; i<= nlapiGetLineItemCount('item'); i++){
            var item_id = nlapiGetLineItemValue('item','item',i);
            var type_item = nlapiGetLineItemValue('item', 'itemtype', i);

            if (type_item == 'InvtPart'){
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

            nlapiSelectLineItem('item',i);
            nlapiSetCurrentLineItemValue('item', 'description', description_item);
            nlapiCommitLineItem('item');    
        }
        
    }
}
        