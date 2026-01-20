if (window.cmsData.qacodes!=0)
{

$.getScript("https://raw.githubusercontent.com/lokals7/Angular-zips/refs/heads/main/jquery.highlighttextarea.js", function( data, textStatus, jqxhr ) {
  //console.log("loaded"); // Data returned
});

$.getScript("https://raw.githubusercontent.com/lokals7/Angular-zips/refs/heads/main/buttonstrip.min.js", function( data, textStatus, jqxhr ) {
  //console.log("loaded button script"); // Data returned
  var instance = new ButtonStrip({
    id: 'mybutton'
});
$('#toolContCodes').hide()
instance.addButton('Text search', true, 'click', function(){
  $('#toolCont').show()
  $('#toolContCodes').hide()
});
instance.addButton('Codes match', false, 'click', function(){
  $('#toolCont').hide()
  $('#toolContCodes').show()
});
instance.append('#switchbutton');
});


$('head').append('<link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/lokals7/Angular-zips/refs/heads/main/jquery.highlighttextarea.css">');

$('head').append('<link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/lokals7/Angular-zips/refs/heads/main/compareTXT_2.css">');

var htmlappend="<br/><br/><br/><br/><br/><br/><table><tr><td style='text-align:left'><div id='switchbutton'></div></td><td><span id='showdataCont'><input type='checkbox' id='showdata'>Show data</input></span></td></tr><tr><td><table id='toolCont'><tr><td valign='bottom' style='padding:10px'><div style='width:150px'>Legend:<div style='background-color:#ff6666'>Not found</div><div style='background-color:#42c8f5'>Found partial match</div><div style='background-color:#81f542'>Found</div><div style='background-color:#f5a742'>Found more than once</div></div></td><td><textarea type='text' id='pastetxt' rows='25'></textarea></td></tr></table></td><td><table id='toolContCodes'><tr><td width='300px'><textarea type='text' id='pastetxtCodes' rows='25'></textarea></td><td width='20px'></td><td valign='top'><div id='rescodes'></div></td></tr></table></td></tr></table>"
if ($('.footer').length>0) {$('.footer').append(htmlappend)}
else
{
$('.survey-body').after(htmlappend);
$('#toolCont').attr('style', 'width: 900px !important;margin:2em 0;display:inline-block');
$('#switchbutton').attr('style', 'display:inline-block;vertical-align:top;padding-bottom:10px');
}



$('#pastetxt').attr('style', 'width: 800px !important');
$('#pastetxt').on('input',  function(event) {

$('.survey-body').find('[style*="background-color"]').css("background-color","")
$('[id*="CUSTOMSPAN"]').each(function(){

	if ($(this).children().length==0 && $(this).contents().length==1 && $(this).contents()[0].nodeValue=="") {$(this).remove()} 
	
	else if ($(this).children().length==0) {$(this).contents().not('option').unwrap()}
	else {$(this).contents(":first-child").not('option').unwrap()}
})

$('.highlightTextarea-highlighter').remove()
$('#pastetxt').highlightTextarea('destroy')
	mytxt=$('#pastetxt').val()
	var splittxt= mytxt.split('\n')
	for (var ff in splittxt)
	{
		splittxt[ff]=splittxt[ff].replace(/^(([0-9A-Za-z]{1,1}|[0-9]{1,}|[A-Za-z]{1,}[0-9]{1,}|[0-9]{1,}[.][A-Za-z]{1,}|[ivx]{2,})[.)]|\u2022|-|\u25CF)\s+/gi,'')
		
			splittxt[ff]=splittxt[ff].replace(/[\uF06D]/g, '');
			splittxt[ff]=splittxt[ff].replace(/[\u25CB]/g, '')
			splittxt[ff]=splittxt[ff].replace(/[\u00A0]/g, ' ')
			splittxt[ff]=splittxt[ff].replace(/[\u0009]/g, ' ');
			splittxt[ff]=splittxt[ff].replace(/[\s]{2}/g, ' ');
		if (event.originalEvent.data!=" ") {splittxt[ff]=splittxt[ff].trim()}
	}
	mytxt=splittxt.join('\n')

	$('#pastetxt').val(mytxt)
	$('#pastetxt').focus()
})
$('#pastetxt').on('paste',  function() {
if ($('#pastetxt').val()) {$('#pastetxt').val($('#pastetxt').val()+'\n')}
})

document.onkeyup=function(e){
var e = e || window.event; 
//FORWARD = alt+B
if(e.ctrlKey && e.keyCode == 66) {

$('[id*=CUSTOMSPAN]').css('background-color','transparent')
comparetxt()
$('th').parents('[id*=CUSTOMSPAN]').css('display','contents')
$('.highlightTextarea-container').css({'height':$('.highlightTextarea').height()})
};

//Added shortcuts
	var e = e || window.event; // for IE to cover IEs window event-object
		//FORWARD = alt+A
			if(e.altKey && e.keyCode == 65) {
			$('#btn_continue').click()
			return false;
		}
		//BACKWARD = alt+Z
		if(e.altKey && e.keyCode == 90) {
		$('#btn_goback').click()
		return false;
		}
		//1st option = alt+W then click Next (alt+A)
		if(e.altKey && e.keyCode == 87) {
		$('input[value=0]').each(function(){
       		 $(this).prop("checked", !$(this).prop("checked"));
		});
		//alert(qtext+"\n"+itext+"\n\n"+optList.join("\n"))
		return false;	
		}
		//answer me = alt+R
		if(e.altKey && e.keyCode == 82) {
		$('#btn_randomize').click()
		return false;	
		}
		//Show codes for carousel = alt+Q
		if(e.altKey && e.keyCode == 81) {
		$('.answers').css('visibility','visible')
		$('.answers').toggle();
		return false;
		}
		// alt+C
		if(e.altKey && e.keyCode == 67) {
		alert ("OKEH KEHYO\ncheckbox checked"+" "+ $('input[type="checkbox"]:checked').length+"\n"+"checkbox unchecked"+" "+ $('input:checkbox:not(:checked)').length+"\nradio checked "+$('input[type="radio"]:checked').length+"\nradio unchecked "+$('input:radio:not(:checked)').length);
			$('input:checkbox:not(:checked)').parent().parent().parent().toggle();
			$('input:radio:not(:checked)').parent().parent().parent().toggle();
			return false;
		}
		//1st option = alt+N
		if(e.altKey && e.keyCode == 78) {
		$('.qaInfo, .qaCode, .Condition').toggle();
		$('.qaCode').siblings().toggle();
		//alert(qtext+"\n"+itext+"\n\n"+optList.join("\n"))
		return false;
		}
		if(e.altKey && e.keyCode == 88) {
		$('#btn_randomize').click()
		setTimeout(function() {
			$('#btn_continue').click()
		}, 500);
		return false;
		}

}
//FIX  browswer back button clearing
setTimeout(function() {$('input[type=checkbox]:checked').next().addClass('selected')
$('input[type=radio]:checked').next().addClass('selected')}, 2000);

//SHOW DATA FOR TOOLS
$('#showdataCont').hide()
setTimeout(function() {
if ($('.mx-container,.maxdiff-container,.answerpad,#customToolArea,.gridclick,.sq-cardsort,#ToolContainer').length>0)
{
$('#showdataCont').show()
}	
}, 3000);


$('#showdata').on('change',function(){
if($(this).is(':checked'))
{
$('.answers').css("display","inherit") 
$('.answers').css("visibility","inherit") 
$('.setWidth').removeClass('grid-list-mode')
$('.setWidth').addClass('grid-table-mode')
//$('#btn_continue').css("display","inherit") 
//$('#btn_continue').css("visibility","inherit") 
}
else
{
$('.answers').css("display","none") 
$('.answers').css("visibility","hidden") 

}
})





function comparetxt()
{
var additionalhighlight =[]
$('.highlightTextarea-highlighter').remove()
$('#pastetxt').highlightTextarea('destroy')
	var surveytexts=[]
	$('div[id*="question_"],.html,.gridclick,#customToolArea,.mx-container,#ToolContainer,.answerpad,.maxdiff-container').find('*').not(".qaCode,.hidden,script,:hidden,br").add($('.sq-cardsort-card').find('*')).add($('select').not('.cmsQuestionSelect').find('option[value!=""][value!="-1"]')).add($('.customItemInner')).add($('[class*=toolContainer]').find('*')).each(function(){
	if ($(this).parents('.qaCode').length==0 && $(this).children('[id*=CUSTOMSPAN]').length==0 && 	(!["U","B","I","A"].includes($(this).prop('nodeName')) || ((!$(this).text().match(/\[[\d]{1,}\]/gi) && ($(this).parent().hasClass('answers') || $(this).text().length==$(this).parents().not('b,u,i').eq(0).clone().children('.qaCode').remove().end().text().trim().length)) ||  ($(this).text().replace(/\[[\d]{1,}\]/gi,"").length==$(this).parents().not('b,u,i').eq(0).clone().children('.qaCode').remove().end().text().trim().replace(/\[[\d]{1,}\]/gi,"").length))))
	{
		
	var chktext=$(this).clone().children().remove().end().text().trim()
	//console.log("chks"+chktext+';type='+$(this).prop('nodeName'));
	
	if (chktext)
	{
var splitelem=[]
if ($(this).children().not('b,u,i,.qaCode,a').length==0)
{
//console.log($(this).text())
//console.log($(this).children())
splitelem.push($(this))	
}
else
{

var brcount=0
$(this).contents().each(function(){

if($(this).prop('nodeName')!='BR' && !$(this).hasClass('qaCode'))
//console.log(this.nodeName)
{$(this).add($(this)).wrap('<span class=COMBINE'+brcount+'/>')}
else {brcount++}
})

$('[class*=COMBINE]').each(function(){
if (!$(this).parent().attr('id') || $(this).parent().attr('id').substring(0,10)!='CUSTOMSPAN')
{
//console.log($(this).attr('class'))
myiindex =$(this).attr('class').toString().substring(7,99)
//console.log(myiindex)
//console.log($('[class=COMBINE'+myiindex+']'))
var myclassname = "CUSTOMSPAN"+Math.random().toString(36).substring(7);
$('[class=COMBINE'+myiindex+']').wrapAll('<span id='+myclassname+'/>')
splitelem.push($('[id='+myclassname+']'))
}
})

$('[class*=COMBINE]').each(function(){
	if ($(this).children().length==0) {$(this).contents().unwrap()}
	else {$(this).contents(":first-child").not('option').unwrap()}
	
})

}


	for (var kk=0;kk<splitelem.length;kk++)
	{
	//console.log("IN"+kk)
	//console.log($(splitelem[kk]))
	//console.log("IS QA="+$(splitelem[kk]).hasClass('qaCode'))
	//console.log("node="+$(splitelem[kk]).nodeName)
	var tmptxt = $(splitelem[kk]).clone().children('.qaCode').remove().end().text().replace(/<[^>]*>{1,999}/gm, '').replace(/\[[\d]{1,}\]/gm, '')
	if($(splitelem[kk]).prop('nodeName')=='OPTION')
	{
		tmptxt=tmptxt.replace(/\[[ch\d]{1,}\]/gm, '').replace(/\[[r\d]{1,}\]/gm, '')
		
	}
	
	
	//console.log("tmptxt="+tmptxt)
	if (tmptxt.trim()!="")
	{
	//console.log("HAS TXT")
	var tmpselect = ""
	
	if ($(splitelem[kk]).attr('id'))
	{
	tmpselect="#"+$(splitelem[kk]).attr('id')
	}
	
	else if($(splitelem[kk]).prop('nodeName')=='OPTION')
	{
		$(splitelem[kk]).attr('id',"CUSTOMSPAN"+Math.random().toString(36).substring(7))
		tmpselect="#"+$(splitelem[kk]).attr('id')
	}

	else if (!$(splitelem[kk]).parents('span').eq(0).attr('id') || $(splitelem[kk]).parents('span').eq(0).attr('id').substring(0,10)!='CUSTOMSPAN' || $(splitelem[kk]).siblings().length>0 ) 
	{
	var myclassname = "CUSTOMSPAN"+Math.random().toString(36).substring(7);
	if ($(splitelem[kk]).parent().hasClass('cell')) {$(splitelem[kk]).parent().wrap('<span id='+myclassname+'/>');}
	else {$(splitelem[kk]).wrap('<span id='+myclassname+'/>');}
	tmpselect="#"+myclassname
	}
	
		else if ($(splitelem[kk]).parents('span').eq(0).attr('id') && $(splitelem[kk]).parents('span').eq(0).attr('id').substring(0,10)=='CUSTOMSPAN') 
	{
		tmpselect="#"+$(splitelem[kk]).parents('span').eq(0).attr('id')
		
	}
	//console.log("Selector="+tmpselect);
	if (!surveytexts.find(x => x.selector === tmpselect))
	{
	surveytexts.push({id:$(splitelem[kk]).attr('id'),text:tmptxt.trim(), for:$(this).attr('for'), selector:tmpselect,found:0})
	}
	}
	else if ($(splitelem[kk]).contents().length==1 && $(splitelem[kk]).children().length==0 && $(this).contents()[0].nodeValue==""){$(splitelem[kk]).remove()}
	}
	}
	}
	})
for (var tt in surveytexts)
{
$(surveytexts[tt].selector).css('background-color','transparent')

}

//console.log(surveytexts)

	var pastedtexts=[]
	var pastedtextstmp=$('#pastetxt').val().split("\n")
	for (var k in pastedtextstmp)
	{
		if (pastedtextstmp[k].trim()!='')
	{pastedtexts.push({text:pastedtextstmp[k].replace('\t',''),found:0})}
	}

//console.log(pastedtexts)
wordstocolorgreen=[]
wordstocolorred=[]
wordstocolororange=[]
wordstocolorblue=[]
	for (var cc=0;cc<pastedtexts.length;cc++)
	{
	var pasteencode=encodetxt(pastedtexts[cc].text.trim())
	
	for (var m in surveytexts)
	{
	var surveyencode=surveytexts[m].text.replace(/[\u00A0]/g, ' ');
	surveyencode=surveyencode.replace(/[\s\n\r]/g, ' ');
	surveyencode=surveyencode.replace(/[\s]{2}/g, ' ');
	//console.log(pasteencode)
	//console.log(surveyencode);
	//console.log("emc"+pasteencode);
	if (pastedtexts[cc].text.trim()==surveyencode || pasteencode==surveyencode)
	{
		//console.log("IN");
//console.log(pastedtexts[cc].text)
//console.log(pasteencode)
//console.log(surveyencode)
	$(surveytexts[m].selector).css('background-color','#81f542')
	surveytexts[m].found++
//console.log('Increased for '+	surveytexts[m].text + surveytexts[m].found)
	pastedtexts[cc].found++ 

	if (wordstocolorgreen.indexOf(pastedtexts[cc].text.trim())==-1)
	{wordstocolorgreen.push(pastedtexts[cc].text.trim())}
	}
	}
//	console.log(pastedtexts);
//	console.log(surveytexts)
}
	for (var cc=0;cc<pastedtexts.length;cc++)
	{
	var pasteencode=encodetxt(pastedtexts[cc].text.trim())
	for (var hh in surveytexts)
	{
	
	var surveyencode=surveytexts[hh].text.replace(/[\u00A0]/g, ' ');
	surveyencode=surveyencode.replace(/[\s\n\r]/g, ' ');
	surveyencode=surveyencode.replace(/[\s]{2}/g, ' ');
	 if(parseInt(surveytexts[hh].found)==0 && parseInt(pastedtexts[cc].found)==0 && (checkpartialmatch(pastedtexts[cc].text.trim(),surveyencode)[0]>0 || checkpartialmatch(pasteencode,surveyencode)[0]>0))
	{

	$(surveytexts[hh].selector).css('background-color','#42c8f5')
	
	var mismatchresult= checkpartialmatch(pastedtexts[cc].text.trim(),surveyencode)[1] || checkpartialmatch(pasteencode,surveyencode)[1]
	additionalhighlight.push([pastedtexts[cc].text.trim(),mismatchresult])
	surveytexts[hh].found++
	pastedtexts[cc].found++	
//	console.log('Increased for '+	pasteencode + "*" +surveyencode)
//	console.log(mismatchresult)
	if (wordstocolorblue.indexOf(pastedtexts[cc].text.trim())==-1)
	{
		wordstocolorblue.push(pastedtexts[cc].text.trim())
	
	}
	}	
	
	}
	
	}

//	console.log(surveytexts);
//console.log(additionalhighlight)
//check for found more than once
for (var zz in surveytexts)
	{

	if (surveytexts[zz].found>1)
	{
		//console.log("in if for"+surveytexts[zz].text);
	$(surveytexts[zz].selector).css('background-color','#f5a742')
	if (wordstocolororange.indexOf(surveytexts[zz].text)==-1)
	{wordstocolororange.push(surveytexts[zz].text)}
	if (wordstocolorgreen.indexOf(surveytexts[zz].text)>-1)
	{wordstocolorgreen.splice(wordstocolorgreen.indexOf(surveytexts[zz].text),1)}

	}
	
	if (surveytexts[zz].found==0)
	{
	$(surveytexts[zz].selector).css('background-color','#ff6666')
	}
	
	
	}

//check for not found in pasted or found more than once
for (var f in pastedtexts)
	{
	if (pastedtexts[f].found==0)
	{
wordstocolorred.push(pastedtexts[f].text.trim())
	}
	
	if (pastedtexts[f].found>1)
	{
		//console.log("in if for pasted"+pastedtexts[f].text);
if (wordstocolorgreen.indexOf(pastedtexts[f].text.trim())>-1)
{wordstocolorgreen.splice(wordstocolorgreen.indexOf(pastedtexts[f].text.trim()),1)}
wordstocolororange.push(pastedtexts[f].text.trim())
	}
	}


//console.log("Green="+wordstocolorgreen)
//console.log("Red="+wordstocolorred)
//console.log("Orange="+wordstocolororange)


$('#pastetxt').highlightTextarea({

  words: [
   {
    color: '#42c8f5',
    words: wordstocolorblue
  },
  {
    color: '#ff6666',
    words: wordstocolorred
  }, {
    color: '#81f542',
    words: wordstocolorgreen
  }, {
    color: '#f5a742',
    words: wordstocolororange
  }]

});
//console.log(additionalhighlight)
for (var gg in additionalhighlight)
{
var tmtext=additionalhighlight[gg][0].replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
var tmpindex=additionalhighlight[gg][1]
$('mark').each(function(){
	//console.log(tmtext)
	//console.log($(this).text())
if ($(this).text()==tmtext)	
{
	$(this).html($(this).text().split("").slice(0,tmpindex-5<0?0:tmpindex-5).join("")+'<mark style="background-color:yellow">'+$(this).text().split("").slice(tmpindex-5<0?0:tmpindex-5,tmpindex+5).join("")+ ($(this).text().split("").length>tmpindex+5?"":"  ")+'</mark>'+$(this).text().split("").slice(tmpindex+5).join(""))
}
})
}



//fixes to overwrite background
$('[id*=CUSTOMSPAN]').children().css('background-color','inherit')

}

}
$('#pastetxtCodes').on('input',  function(event) {
codescompare()
})

function codescompare()
{
var additionalhighlight =[]
$('.restable').remove()
var surveylist=[]
var pastedlist=[]
$('span.qaCode').each(function(){
	if ($(this).parent('.col-legend').length==0 && $(this).parent('.row-legend').length==0 && $(this).parents('.sq-atm1d-button').length==0 && !$(this).next().hasClass('element'))
	{
surveylist.push({code:$(this).text().replace("[","").replace("]","").replace('r',""),text:$(this).parent('th').length>0?$(this).parent().contents().not('script,sup').slice(2).text().trim():$(this).parent().siblings().contents().not('script,sup').text().trim(),found:0})	
}
else if( $(this).parents('.sq-atm1d-button').length==0 && !$(this).next().hasClass('element'))
{
	var tmptxt=""
	var elems=$(this).parent().contents()
	for (var z=0;z<elems.length;z++)
	{
		intxt=""
		if (elems[z].nodeValue!=null)
		{
		intxt=elems[z].nodeValue.toString()
		}
		else if (elems[z].innerHTML!="" && elems[z].classList[0]!='qaCode' && elems[z].nodeName!='SCRIPT')
		{
		intxt=elems[z].innerHTML.toString()
		}
	if (intxt!="")
	{
		tmptxt+=intxt.replace(/\[[\d]{1,}\]/gi,"")
	}
	}

surveylist.push({code:$(this).text().replace("[","").replace("]","").replace('c',"").replace('r',""),text:tmptxt.trim(),found:0})		
}

else if( $(this).next().hasClass('element') && $(this).next().children().find('label').length>0)
{

surveylist.push({code:$(this).text().replace("[","").replace("]","").replace('c',"").replace('r',""),text:$(this).next().children().find('label').text().trim(),found:0})		
}


})

$('.dropdown').find('option').each(function(){

tmptxt=$(this).text().replace(/\[[ch\d]{1,}\]/gm, '')
if ($(this).text().match(/\[[ch\d]{1,}\]/gm, ''))
{
surveylist.push({code:$(this).text().match(/\[[ch\d]{1,}\]/gm, '')[0].replace("]","").replace("[ch",""),text:tmptxt.trim().replace(/COND$/, '').replace(/[\n\r]/g, ''),found:0})
}

})

for (var mm in surveylist)
{
	surveylist[mm].text=surveylist[mm].text.replace(/[\s]{2}/g, ' ');
	surveylist[mm].text=surveylist[mm].text.replace(/{@.*@}/,"");
	surveylist[mm].text=surveylist[mm].text.replace(/{@.*@}/,"");
	surveylist[mm].text=surveylist[mm].text.replace(/<\/?[biu]>/g, "");  
}



mytxt=$('#pastetxtCodes').val()
var splittxt= mytxt.split('\n')
	for (var ff in splittxt)
	{
		splittxt[ff]=splittxt[ff].replace(/[\040]{2}/g, ' ');
		splittxt[ff]=splittxt[ff].replace(/[\t]{2}/g, '\t');
		if (splittxt[ff].match(/^([0-9]{1,}[.)] )+/gi)) 
		{
			splittxt[ff]=splittxt[ff].replace(/^([0-9]{1,}[.)]) /,"$1\t")
		}


			splittxt[ff]=splittxt[ff].replace(/^(\[r)(\d+){1,}(\]) /,"$2\t")
	
		splittxt[ff]=splittxt[ff].replace(/[\t]{2}/g, '\t');
		var splitbytab=splittxt[ff].split('\t')
		if (splitbytab.length>=2)
		{
			
		var placeofcode="left"
		if (isNaN(splitbytab[0]) && !splitbytab[0].match(/^\d+(?:[.)])/)) {placeofcode="right"}
		pastedlist.push({code:placeofcode=="left"?splitbytab[0].replace(".","").replace(")","").trim():splitbytab[1].replace(")","").trim(),text:placeofcode=="left"?splitbytab[1].trim():splitbytab[0].trim(),found:0,labelmatch:0,labellink:"",partialmatch:0,surveycode:0})
		}
}



for (var i=0;i<pastedlist.length;i++)
{
for (var k=0;k<surveylist.length;k++)
{
if (pastedlist[i].text==surveylist[k].text || encodetxt(pastedlist[i].text)==surveylist[k].text  || pastedlist[i].text.replace("&","&amp;")==surveylist[k].text)
{
pastedlist[i].found=1
surveylist[k].found=1
if (pastedlist[i].code==surveylist[k].code)
{
pastedlist[i].labelmatch=1
pastedlist[i].labellink=surveylist[k].code
}
else
{
	pastedlist[i].surveycode=surveylist[k].code
}
}
}
}


for (var rr=0;rr<pastedlist.length;rr++)
{
for (var tt=0;tt<surveylist.length;tt++)
{
var arrtexts=[pastedlist[rr].text,encodetxt(pastedlist[rr].text)]
for (var yy in arrtexts)
{
if (surveylist[tt].found!=1 && pastedlist[rr].found!=1 && checkpartialmatch(arrtexts[yy],surveylist[tt].text)[0]>0)
{
pastedlist[rr].found=1
surveylist[tt].found=1
pastedlist[rr].partialmatch=1
var mismatchresult= checkpartialmatch(arrtexts[yy],surveylist[tt].text)[1]
additionalhighlight.push([arrtexts[yy],mismatchresult])
if (pastedlist[rr].code==surveylist[tt].code)
{
pastedlist[rr].labelmatch=1
pastedlist[rr].labellink=surveylist[tt].code
}
else
{
pastedlist[rr].surveycode=surveylist[tt].code
}
}
}
}
}	

//console.log(surveylist)	
//console.log(pastedlist)	
//console.log(additionalhighlight)
var tabletoappend="<table class='restable'><tr><td><b>Item</b></td><td><b>Code in q-re</b></td><td><b>Code in link</b></td></tr>"

for (var i=0;i<pastedlist.length;i++)
{
tabletoappend+="<tr "
tabletoappend+="class="
if (pastedlist[i].labelmatch==1) {tabletoappend+="'greenmatch'"}
else {tabletoappend+="'redmatch'"}
tabletoappend+=">"

tabletoappend+="<td class="
if (pastedlist[i].partialmatch==1) {tabletoappend+="'bluematch'"}
tabletoappend+=">"
tabletoappend+=pastedlist[i].text
tabletoappend+="</td>"
tabletoappend+="<td>"
tabletoappend+=pastedlist[i].code
tabletoappend+="</td>"
tabletoappend+="<td>"
if (pastedlist[i].labellink!="") {tabletoappend+=pastedlist[i].labellink}
else if (pastedlist[i].found==1) {tabletoappend+=pastedlist[i].surveycode}
else {tabletoappend+="NOT FOUND"}
tabletoappend+="</td>"
tabletoappend+="</tr>"
}

if(pastedlist.length>0)
{
for (var k=0;k<surveylist.length;k++)
{
if (surveylist[k].found==0)
{
tabletoappend+="<tr class=redmatch>"
tabletoappend+="<td>"
tabletoappend+=surveylist[k].text
tabletoappend+="</td>"
tabletoappend+="<td>NOT FOUND</td>"
tabletoappend+="<td>"
tabletoappend+=surveylist[k].code

tabletoappend+="</td>"
tabletoappend+="</tr>"
}
}

tabletoappend+="</table>"
$('#rescodes').append(tabletoappend)
}
//console.log(additionalhighlight)
for (var gg in additionalhighlight)
{
var tmtext=additionalhighlight[gg][0].replace("&","&amp;")
var tmpindex=additionalhighlight[gg][1]


$('.bluematch').each(function(){
if ($(this).text()==tmtext || encodetxt($(this).text())==tmtext)	
{
	$(this).html($(this).text().split("").slice(0,tmpindex-5<0?0:tmpindex-5).join("")+'<span style="background-color:yellow">'+$(this).text().split("").slice(tmpindex-5<0?0:tmpindex-5,tmpindex+5).join("")+ ($(this).text().split("").length>tmpindex+5?"":"&nbsp;&nbsp;&nbsp;&nbsp;")+'</span>'+$(this).text().split("").slice(tmpindex+5).join(""))
}
})
}

}

function checkpartialmatch(str1,str2)
{
	var mimsmatchtype=0 //1=case mismatch,2=one symbol or word additional in one string,3=one symbol or word different in the two strings
		var mismatchpart=""
		var splitvars=[""," "]
		for (var z=0;z<splitvars.length;z++)
		{
		var longer = str1.length>str2.length?str1:str2
		var shorter = str1.length>str2.length?str2:str1
		for (var k=0;k<longer.split(splitvars[z]).length;k++)
		{
      
     	var cutwhole=longer.split(splitvars[z]).slice(0,k).join(splitvars[z])+longer.split(splitvars[z]).slice(k,k+1).join(splitvars[z])+longer.split(splitvars[z]).slice(k+1).join(splitvars[z])
		
		if (cutwhole==shorter)
		{
			mimsmatchtype=1
			var sliced=cutstr.split(splitvars[z]).slice(0,k).join(splitvars[z])
			if (sliced.length>0) {mismatchpart=z==0?k:sliced.length}	
			//console.log(mismatchpart);
		}
		
		var cutstr=longer.split(splitvars[z])
    	cutstr.splice(k,1)
    	cutstr=cutstr.join(splitvars[z])
		if (cutstr==shorter && cutstr.length>2 ) 
		{
			mimsmatchtype=2
			var sliced=cutstr.split(splitvars[z]).slice(0,k).join(splitvars[z])
			mismatchpart=z==0?k:sliced.length+5
			//console.log("AFT"+mismatchpart);
		}
		
else if (mismatchpart=="")
		{
		var cutstrshort=shorter.split(splitvars[z])
    	cutstrshort.splice(k,1)
    	cutstrshort=cutstrshort.join(splitvars[z])
    	if (cutstr==cutstrshort && cutstrshort.length>2) 
    	{
    		mimsmatchtype=3
    		var sliced=cutstrshort.split(splitvars[z]).slice(0,k).join(splitvars[z])
    		//console.log("IN"+sliced);
    		if (sliced.length>0) {mismatchpart=z==0?k:sliced.length+5}
    		//console.log(mismatchpart);
    	} 
		}
		}
		}
		
	
	//console.log("part="+mismatchpart);
	return [mimsmatchtype,mismatchpart]
}


function encodetxt(str)
{
	var encoded=str.replace(/[\u2018]/g, "'");
	encoded=encoded.replace(/[\u2019]/g, "'");
	encoded=encoded.replace(/[\u201C]/g, '"');
	encoded=encoded.replace(/[\u201D]/g, '"');
	encoded=encoded.replace(/[\u2013]/g, '-');
	encoded=encoded.replace(/[\u2026]/g, '...');
	encoded=encoded.replace(/[\u00A0]/g, ' ');
	encoded=encoded.replace(/[\u0009]/g, ' ');
	encoded=encoded.replace(/[\s]{2}/g, ' ');
	return encoded
}
