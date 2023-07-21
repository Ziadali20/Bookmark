var bookmarkName=document.getElementById('bookmarkName');
var bookmarkURL=document.getElementById('bookmarkURL');
var sitesContainer=[]
if(localStorage.getItem('mySites')!=null)
{
    sitesContainer=JSON.parse(localStorage.getItem('mySites'));
    displaySites();
}
else{
    sitesContainer=[];
}
function addBookmark() {
    var site={
        name:bookmarkName.value,
        url:bookmarkURL.value
    }
    if(validateName(bookmarkName.value)!=false&&validateUrl(bookmarkURL.value)!=false&&checkDupliaction(bookmarkName.value)!=false)
    {
    sitesContainer.push(site);
    localStorage.setItem('mySites',JSON.stringify(sitesContainer));
    displaySites();
    clearForm();
    }
    else{
        rulesOfInp();
    }
}
function clearForm()
{
    bookmarkName.value=''
    bookmarkURL.value=''
}
function displaySites()
{
    list=``
    for(var i=0;i<sitesContainer.length;i++)
    {
        list+=
        `
    <tr>
        <td>${i+1}</td>
        <td>${sitesContainer[i].name}</td>
        <td><button class="btn btn-primary">
        <i class="fa-solid fa-eye pe-2"></i>
        <a href="${sitesContainer[i].url}" target="_blank" class="text-decoration-none text-white">View</a>
        </button></td>
        <td><button class="btn btn-danger pe-2" onclick="deleteSite(${i})">
        <i class="fa-solid fa-trash-can"></i>
        Delete
        </button></td>
      </tr>
        `
    }
    document.getElementById('tableList').innerHTML=list;
}
function deleteSite(index)
{
    sitesContainer.splice(index,1);
    localStorage.setItem('mySites',JSON.stringify(sitesContainer))
    displaySites();
}

function validateName(name) {
    var regxName=/^\w{3,}$/;
    return regxName.test(name);
}
function validateUrl(url)
{
    var regxURL=/^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[\w\-\.\?\=\&\#\%]*)*$/;
    return regxURL.test(url)
}

function rulesOfInp()
{swal(
  {
  title:`Site Name or Url is not valid, 
  Please follow the rules below :`,
  text:"Site name must contain at least 3 characters\nSite name can't be duplicated\nSite URL must be a valid one",
  icon:"error",
  buttons:"Try again",
  // timer:3500,
  className:"validate"
  }
)}



function checkDupliaction(test)
{
    for (var i = 0; i < sitesContainer.length; i++) 
    {
        if (sitesContainer[i].name.toLowerCase()==(test.toLowerCase())) 
        {
          return false;
         
        }
        else
        {
            return true;
        }
      
    }
    
}
