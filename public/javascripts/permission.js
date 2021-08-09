$(()=>{
	loadCreatedRolesFromDatabase();
	loadCreatedRolesForUrlAssignment();
	setUpRoleAssignmentTable();


});

let loadCreatedRolesFromDatabase = () => {
	$.ajax({
		type: 'POST',
		url: '/admin_functions/getAllRoles'
	}).done((result)=>{
		var resultLength = result.length;
		var tabCont = '';
		for ( var i=0 ; i <resultLength ; i++) {
			tabCont += '<tr>';
			tabCont += '<td class=\'roleId\'>'+result[i].roleId+'</td>';
			tabCont += '<td>'+result[i].name+'</td>';
			tabCont += '<td>'+result[i].head+'</td>';
			tabCont += '<td>'+result[i].description+'</td>';
			tabCont += '<td><button class="btn btn-danger" onclick="return deleteRole(this)" ><i class="fa fa-trash"></i></button></td>';
			tabCont += '</tr>';
		}
		tabCont += '<tr>';
		tabCont += '<td class=\'roleId\'> Role Id </td>';
		tabCont += '<td><input class=\'form-control roleName\' type=\'text\'  /></td>';
		tabCont += '<td><input class=\'form-control roleHead\' type=\'text\' /></td>';
		tabCont += '<td><input class=\'form-control roleDesc\' type=\'text\'  /></td>';
		tabCont += '<td class="btn-toolbar"><button class=\'btn btn-primary\' onclick = \'return createNewRole(this)\'> + Role</button><button class=\'btn btn-danger\' onclick = \'return resetRoleForm(this)\'> Reset </button></td>';
		tabCont += '</tr>';
		$('#role-creation-table').html(tabCont);
	});
}

let createNewRole = (element)=>{
	var localRowTrElement = $(element).closest('tr');
	var roleName = localRowTrElement.find('.roleName').val(),
		roleHead = localRowTrElement.find('.roleHead').val(),
		roleDesc = localRowTrElement.find('.roleDesc').val();

	var info = {
		name : roleName , 
		head : roleHead ,
		description : roleDesc
	};

	$.ajax({
		type : "POST" ,
		url : "/admin_functions/createNewRole" ,
		data : { info : info }
	}).done((result) => {
		if(result == ''){
			failMsg('Couldn\'t create New Role');
		} else {
			successMsg('New Role Created.');
			loadCreatedRolesFromDatabase();
			loadCreatedRolesForUrlAssignment();
		}

	});
};

let resetRoleForm = (element) =>{
	var localRowTrElement = $(element).closest('tr');
	localRowTrElement.find('.roleName').val('');
	localRowTrElement.find('.roleHead').val('');
	localRowTrElement.find('.roleDesc').val('');
	localRowTrElement.find('.roleId').text('Role Id');
}

let deleteRole = (element) =>{
	let localRowTrElement = $(element).closest('tr');
	let roleId = localRowTrElement.find('.roleId').text();	
	$.ajax({
		type  : 'POST',
		url : "/admin_functions/deleteRole",
		data : { id : roleId }
	}).done((result)=>{
		if(result == ''){
			failMsg('Role Successfully Deleted');
		} else {
			successMsg('Role Deleted.');
			loadCreatedRolesFromDatabase();
			loadCreatedRolesForUrlAssignment();
		}

	});
}

let loadCreatedRolesForUrlAssignment = () => {
	$.ajax({
		type: 'POST',
		url: '/admin_functions/getAllRoles'
	}).done((result)=>{
		var resultLength = result.length;
		var tabCont = '';
		for ( var i=0 ; i <resultLength ; i++) {
			tabCont += '<tr>';
			tabCont += '<td>'+result[i].name+'</td>';
			tabCont += '<td><table class="table"><tr><th>Url</th><th>Description</th><th></th></tr>';
			for( var j=0 ; j<result[i].permissions.length ; j++){
				tabCont +='<tr>';
				tabCont +='<td>'+result[i].permissions[j].url+'</td>';
				tabCont +='<td>'+result[i].permissions[j].description+'</td>';
				tabCont +='<td><a onclick=\"return deletePermissionUrl(\''+result[i].roleId+'\',\''+result[i].permissions[j]._id+'\')\"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
				tabCont +='</tr>';
			}
			tabCont += '</table></td>';
			tabCont += '<td><div class="row"><div class="col-sm-4"><input type=\'text\' class="form-control ipUrl" placeholder="Enter Url" /><input type=\'text\' class="form-control ipUrlDesc" placeholder="Enter Description" /></div><div class="col-sm-4"><button class="btn btn-warning" onclick="return pushUrlToRole(\''+result[i].roleId+'\',this)"><i class="fa fa-angle-left"></i>Push</button></div></div></td>';
			tabCont += '</tr>';
		}
		$('#url-assignment-table').html(tabCont);
	});
}

let pushUrlToRole = (roleId , element) => {
	let localRowTrElement = $(element).closest('td');
	let ipUrl = localRowTrElement.find('.ipUrl').val();
	let ipUrlDesc = localRowTrElement.find('.ipUrlDesc').val();

	$.ajax({
		type: "POST",
		url: "/admin_functions/pushUrlIntoRole",
		data : { ipUrl , ipUrlDesc , roleId }
	}).done((result)=>{
		if(result == ''){
			failMsg("Opps! Something went wrong.");
		} else {
			successMsg('Url pushed Successfully.');
			loadCreatedRolesForUrlAssignment();
		}
	});

}

let deletePermissionUrl = (roleId,permissionId) =>{
	$.ajax({
		type : "POST",
		url : "/admin_functions/deletePermissionUrl",
		data : { roleId , permissionId }
	}).done((result)=>{
		if(result == ''){
			failMsg('Something went wrong.');
		} else {
			successMsg('Successfully removed Url.');
			loadCreatedRolesForUrlAssignment();
		}

	});
}

let setUpRoleAssignmentTable = () => {
	$.ajax({
        type: 'POST',
        url: '/admin_functions/getAllAdminUsers'
    }).done(function (resultAdmin) {
    	
    	$.ajax({
    		type:"POST",
    		url : "/admin_functions/fetchRolesByHead"
    	}).done((resultRole)=>{
    		$("#role-assign-table").html('');
    		for( var i=0 ; i<resultAdmin.length ; i++) {
    			var tabCont = '';
    			var tabSecondRow = '';
    			tabCont +='<tr><td></td>';
    			tabSecondRow +='<tr class=\'assignRoleTr\'>';
    				tabSecondRow +='<td data=\''+resultAdmin[i]._id+'\'>'+resultAdmin[i].name+" ";
    				tabSecondRow += resultAdmin[i].isBlocked ? "<i class=\"fa fa-lock\" aria-hidden=\"true\" onclick=\"blockUnblockAdmin(\'"+resultAdmin[i]._id+"\',"+false+")\"></i>" : "<i class=\"fa fa-unlock\" aria-hidden=\"true\" onclick=\"blockUnblockAdmin(\'"+resultAdmin[i]._id+"\',"+true+")\"></i>";
					// tabSecondRow += "<button onclick='killAdminSession(\""+resultAdmin[i]._id+"\")'>Kill Session</button>";
    				tabSecondRow +='</td>';
    				//tabCont +='<td>';
    					for(var j = 0 ; j<resultRole.length ; j++) {
    						tabCont +='<td>'+resultRole[j]._id +'</td>';
    						tabSecondRow +='<td>';
    						for(var k = 0 ; k<resultRole[j].roles.length ; k++) {
    							var existsFlag = false;
    							if($.inArray(resultRole[j].roles[k].roleId, resultAdmin[i].roles)!=-1) {
    								existsFlag = true;
    							}
    							if(existsFlag){
    								tabSecondRow += "<input name='"+resultRole[j].roles[k].roleName+"' type='checkbox' value='"+resultRole[j].roles[k].roleId+"' checked />"+ resultRole[j].roles[k].roleName + "<br>";	
    							} else {
    								tabSecondRow += "<input name='"+resultRole[j].roles[k].roleName+"' type='checkbox' value='"+resultRole[j].roles[k].roleId+"' />"+ resultRole[j].roles[k].roleName + "<br>";
    							}
    							
    						}
    						tabSecondRow +='</td>'
    					}
    				
    			tabCont +='<td></td></tr>';
    			tabSecondRow +='<td><button type=\'button\' class=\'assignRole btn btn-primary\' onclick=\"return assignRole(this,\''+resultAdmin[i]._id+'\')\"> Assign </button><button type=\'button\' class=\'btn btn-danger hide\' onclick=\"return delteAdmin(\''+resultAdmin[i]._id+'\')\"> Delete </button></td></tr><tr><td></td></tr>';
    			$("#role-assign-table").append(tabCont+tabSecondRow);
    		}

       	});

    });
}

let assignRole = (element,adminId) =>{
	var currentTr = $(element).closest('.assignRoleTr');
	var selectedValues = currentTr.find('input[type=\'checkbox\']:checked');
	var selectValArr = [];
	for( var i=0; i < selectedValues.length ; i++ ){
		selectValArr.push($(selectedValues[i]).val());
	}
	$.ajax({
		type:"POST",
		url:"/admin_functions/updateAdminPermissions",
		data : { "adminId":adminId , "roles" : selectValArr }
	}).done((result)=>{
		if(result == '') {
			failMsg('Sorry,could not assign roles ');
		} else {
			successMsg('Roles Assigned');
		}
	});

}

let blockUnblockAdmin = (_idAdmin,isBlocked) => {
	$.ajax({
		type:"POST",
		url:"/admin_functions/blockUnblockAdmin",
		data : { "id" :_idAdmin ,"isBlocked" : isBlocked }
	}).done((result)=>{
		var msg = isBlocked ? "Blocking" : "Unblocking" ; 
		if(result==''){
			failMsg('Admin '+msg+' failed.');

		} else {
			successMsg('Admin '+msg+' Successfull.');
			setUpRoleAssignmentTable();
		}

	});
}

// let killAdminSession = (_idData)=>{
// 	$.ajax({
// 		type:"POST",
// 		url:"/admin_functions/killAdminSession",
// 		data:{"id":_idData}
// 	}).done((result)=>{
// 		if(result=='') {
// 			failMsg('Unable to kill sessions.');
// 		} else {
// 			successMsg('Successfully deleted all the sessions.');
// 		}
// 	});

// }

let delteAdmin = (adminId) =>{
	$.ajax({
		type:"POST",
		url:"/admin_functions/deleteAdmin",
		data:{"adminId":adminId}
	}).done((result)=>{
		if(result==''){
			failMsg('Admin Successfully Deleted.');
		} else {
			successMsg('Admin deletion failed.');
			setUpRoleAssignmentTable();
		}
	});
}