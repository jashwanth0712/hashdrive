# Hash drive 
## problem statement
Ipfs is awesome , but is it really required to open a web browser to upload files into filecoin.
what if there is only one command like `git push ` `git pull` to upload and get files

# Solution 💡
**Hashdrive** solves the problem, we provide a CLI tool that user can download and use it anywhere , in any directory or filepath to upload the file just with one command ,
![drive](https://github.com/jashwanth0712/hashdrive/blob/main/images/home_page.png?raw=true)
# features📃
| command      | Description || argument    |
| :---        |    :----:   |          ---: |
| -t      | updating the web3.storage API token               || API_Token   |
| -u      |  upload file to web3.storage                || filename  |
| -d     |  download file                    || filename   |
| -ls     |   list all file structures in present directory             ||  - |
| -pwd      | returns the present working directory               || - |
| -cd      | change directory                    || folder name  |

# File structures
We have decided to upload only files into the web3.storage , and store the file structure in a data file .This was required for `ls`, `cd` and `pwd` commands , where we have to traverse through the file structure, Due to this there were huge conflicts on the file storage and retrieval process.
- A Data file to manage entire file structure , and the CIDs of all files was made using solidity smart contract , so that the CIDs are safe and can't be accessed by any attackers
![filestructure](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVhgBYwqxC2Aj2zC_4xh07_Ft0-cyETcI5g&usqp=CAU)
# commands with multiple arguments
since our solution is a CLI application , one of the major problem that we faced was the situation when user enter multiple commands and functionalities at once
- closely studied the commands that need to be mutually excllusive , and those that can be used together , and made the logical conditions to support all the possible and valid command inputs
# Downloading the file
for downloading files from ipfs we just have a get function , as a result whenever we type the function we open a webbrowser , hence the file does not directly get download but opens a webpage , from which we have to download
-  used `window.location` to downloiad the file directly without the browser
# PowerShell says "execution of scripts is disabled on this system."
while installing package as a cli tool , powershell raised an error due to the insufficient permissions
- Running the following command solved the problem `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
here we have signed the execution policy for the existing user , thereby alowing node to install the cli tool
[stack overflow link](https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system)
