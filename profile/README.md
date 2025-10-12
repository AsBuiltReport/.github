<p align="center">
    <a href="https://www.asbuiltreport.com/" alt="AsBuiltReport"></a>
            <img src='https://github.com/AsBuiltReport.png' width="15%" height="15%" /></a>
</p>

<h1 style="font-size:5vw" align="center">
    AsBuiltReport
    <br><br>Document Your Datacenter
    <br>With PowerShell
</h1>

<p align="center">
    <a href="https://twitter.com/AsBuiltReport" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/twitter/follow/AsBuiltReport.svg?style=social" alt="Twitter" /></a>
</p>

<p align="center">
    <a href='https://ko-fi.com/B0B7DDGZ7' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://ko-fi.com/img/githubbutton_sm.svg' border='0' alt='Want to keep alive this project? Support me on Ko-fi' /></a>
</p>

AsBuiltReport is an open source configuration document framework which utilises Microsoft PowerShell to produce as-built documentation in multiple document formats for multiple vendors and technologies. The framework allows users to easily generate clear and consistent documentation, for any environment which supports Microsoft PowerShell and/or a RESTful API.

>[!NOTE]
>Due to time constraints and limited access to development environments and resources for [current contributors](https://www.asbuiltreport.com/about/contributors/), development and support for AsBuiltReport has slowed, with some report modules now falling behind on support for current vendor technology versions.
>
>However, this is an open source project, and we encourage users to [contribute](https://www.asbuiltreport.com/dev-guide/contributing/) to help keep it going.
>
>Your contributions, whether through code, bug reports, or documentation, are crucial to its success!
>
>Use the [discussion board](https://github.com/orgs/AsBuiltReport/discussions) to share ideas, ask for help, or collaborate with others. Together, we can keep improving AsBuiltReport for everyone!

<h3 style="font-size:2vw" align="left"><b>Features</b></h3>

||||
|-----------------------|-----------------------|-----------------------|
| :memo: **Multiple Document Formats** | :world_map: **Multilingual Support - Coming Soon!** | :microscope: **Granular Information Level** |
| Generate reports in one or more document formats, including DOCX, HTML, and Text. | Comprehensive multilingual support allows reports to be generated in multiple languages, where available. | Configure the information level for each report section. You can create a summary report, a fully comprehensive report, or something in between. |
| :art: **Customised Styling** | :package: **Modular Architecture** | :hearts: **Health Checks** | 
| Use the default style or create your own to match your corporate identity. Set page orientation, text and table formatting with fonts, colours, borders and highlighted cells and rows. | The modular architecture and core framework enables users to use the same in-built commands to generate as-built configuration reports from a library of technology vendors. | Enable health checks to highlight configuration issues within a report. Toggle individual health checks on or off as required. |
| :email: **Email Reports** | | |
| Attach and send reports via email to one or more recipients. | | |

<h3 style="font-size:2vw" align="left"><b>Components</b></h3>



|||
|-----------------------|-----------------------|
| 📦 **Core Module** | 📦 **Reports Module** |
| The core module provides the framework for each individual report module. It provides the base commands and default style script used to generate each individual report. | The report module is specific to each vendor and/or technology and is used to extract information from the specific environment.<br><br>The report module will be written to utilise PowerShell modules or RESTful APIs which the vendor/technology provides. |
| ⚙️ **Core Module Configuration** | ⚙️ **Reports Module Configuration** |
|The core module configuration is a JSON file which stores information relating to the author’s name, company information & SMTP mail server configuration.<br><br>Individual core module configuration files can be saved and specified when generating reports. | The reports module configuration is a JSON file which stores information specific to the related report. It holds information such as the report name, version, and release status.<br><br>The report configuration can also provide functionality such as configurable report options, health checks and granular information levels.<br><br>Individual report module configuration files can be saved and specified when generating reports. |
| 🖌️ **Styles Script** |
| The styles script sets the default layout, fonts, colours and sizes used within the report.<br><br>Style scripts can be used to layout cover pages, table of contents and other unique tables or sections.<br><br>Custom style scripts can be created to format reports to match your corporate identity. |

<h3 style="font-size:2vw" align="left"><b>Report Modules</b></h3>

Click each vendor logo to view available report modules and associated documentation.

<table width="100%">
    <tr>
        <td align="center" valign="middle" width="50%"><a href="https://github.com/orgs/AsBuiltReport/repositories?q=VMware&type=all&language=&sort="><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/VMware.png" width="75%" height="75%" /></a></td>
        <td align="center" valign="middle" width="50%"><a href="https://github.com/orgs/AsBuiltReport/repositories?q=Microsoft&type=all&language=&sort="><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/Microsoft.png" width="75%" height="75%" /></a></td>
    </tr>
    <tr>
        <td align="center" valign="middle" width="50%"><a href="https://github.com/orgs/AsBuiltReport/repositories?q=DellEMC&type=all&language=&sort="><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/Dell_EMC.png" width="75%" height="75%" /></a></td>
        <td align="center" valign="middle" width="50%"><a href="https://github.com/orgs/AsBuiltReport/repositories?q=NetApp&type=all&language=&sort="><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/NetApp.png" /></a></td>
    </tr>
    <tr>
        <td align="center" valign="middle" width="50%"><a href="https://github.com/orgs/AsBuiltReport/repositories?q=Nutanix&type=all&language=&sort="><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/Nutanix.png" /></a></td>
        <td align="center" valign="middle" width="50%"><a href="https://github.com/orgs/AsBuiltReport/repositories?q=PureStorage&type=all&language=&sort="><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/PureStorage.jpg" /></a></td>
    </tr>
    <tr>
        <td align="center" valign="middle" width="50%"><a href="https://github.com/orgs/AsBuiltReport/repositories?q=Veeam&type=all&language=&sort="><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/Veeam.png" width="50%" height="50%" /></a></td>
        <td align="center" valign="middle" width="50%"><a href="https://github.com/orgs/AsBuiltReport/repositories?q=Rubrik&type=all&language=&sort="><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/Rubrik.png" /></a></td>
    </tr>
</table>

<h3 style="font-size:2vw" align="left"><b>Additional Information</b></h3>

Please refer to the [AsBuiltReport website](https://www.asbuiltreport.com) for additional information and resources related to this project.
