<p align="center">
    <a href="https://www.asbuiltreport.com/">
        <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/org-banner.png" alt="AsBuiltReport - Document your datacenter with PowerShell" width="880">
    </a>
</p>

<p align="center">
    <a href='https://ko-fi.com/B0B7DDGZ7' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://ko-fi.com/img/githubbutton_sm.svg' border='0' alt='Want to keep alive this project? Support me on Ko-fi' /></a>
</p>

[AsBuiltReport](https://www.asbuiltreport.com) is an open source configuration document framework which utilises Microsoft PowerShell to produce as-built documentation in multiple document formats for multiple vendors and technologies. The framework allows users to easily generate clear and consistent documentation, for any environment which supports Microsoft PowerShell and/or a RESTful API.

>[!NOTE]
>Due to time constraints and limited access to development environments and resources for [current contributors](https://www.asbuiltreport.com/about/contributors/), development and support for AsBuiltReport has slowed, with some report modules now falling behind on support for current vendor technology versions.
>
>However, this is an open source project, and we encourage users to [contribute](https://www.asbuiltreport.com/dev-guide/contributing/) to help keep it going.
>
>Your contributions, whether through code, bug reports, or documentation, are crucial to its success!
>
>Use the [discussion board](https://github.com/orgs/AsBuiltReport/discussions) to share ideas, ask for help, or collaborate with others. Together, we can keep improving AsBuiltReport for everyone!

## Features

|||
|-----------------------|-----------------------|
| :memo: **Multiple Document Formats** | :world_map: **Multilingual Support** | 
| Generate reports in one or more document formats, including DOCX, HTML, and Text. | Comprehensive [multilingual support](https://www.asbuiltreport.com/dev-guide/creating-a-report-module/#language-support-implementation) allows reports to be generated in [multiple languages](https://www.asbuiltreport.com/dev-guide/creating-a-report-module/#language-configuration), where available. | 
| :microscope: **Granular Information Level** | :art: **Customised Styling** |
| [Configure the information level](https://www.asbuiltreport.com/user-guide/new-asbuiltreportconfig/#understanding-infolevel) for each report section. You can create a summary report, a fully comprehensive report, or something in between. | Use the default style or [create your own](https://www.asbuiltreport.com/dev-guide/creating-a-report-style/) to match your corporate identity. Set page orientation, text and table formatting with fonts, colours, borders and highlighted cells and rows. |
| :package: **Modular Architecture** | :hearts: **Health Checks** | 
| The modular architecture and core framework enables users to use the same in-built commands to generate as-built configuration reports from a library of technology vendors. | [Enable health checks](https://www.asbuiltreport.com/user-guide/quickstart/#enable-health-checks) to highlight configuration issues within a report. Toggle individual health checks on or off as required. |
| :email: **Email Reports** | | |
| Attach and send reports via email to one or more recipients. | | |

## Use Cases

|||
|-----------------------|-----------------------|
| :heavy_check_mark: **Compliance Audits** | :arrows_clockwise: **Change Management** |
| Generate point-in-time infrastructure documentation for ISO 27001, SOC 2, PCI-DSS, and other compliance frameworks. | Produce before-and-after documentation for change advisory board (CAB) submissions and post-change verification. |
| :handshake: **Environment Handover** | :shield: **Disaster Recovery** | 
| Accelerate onboarding and handover with comprehensive, consistent infrastructure documentation generated on demand. | Maintain accurate as-built records of your infrastructure to support disaster recovery planning and runbook validation. |

## Components

|||
| :-----------------------| :-----------------------|
| 📦 **Core Module** | 📦 **Reports Module** |
| The core module provides the framework for each individual report module. It provides the [base commands](https://www.asbuiltreport.com/user-guide/new-asbuiltreport/) and default style script used to generate each individual report. | The report module is specific to each vendor and/or technology and is used to extract information from the specific environment.<br><br>The report module will be written to utilise PowerShell modules or RESTful APIs which the vendor/technology provides. |
| ⚙️ **Core Module Configuration** | ⚙️ **Reports Module Configuration** |
|The core module configuration is a JSON file which stores information relating to the author’s name, company information & SMTP mail server configuration.<br><br>Individual core module configuration files can be saved and specified when generating reports. | The reports module configuration is a JSON file which stores information specific to the related report. It holds information such as the report name, version, and release status.<br><br>The report configuration can also provide functionality such as configurable report options, health checks and granular information levels.<br><br>Individual report module configuration files can be saved and specified when generating reports. |
| 🖌️ **Styles Script** |
| The styles script sets the default layout, fonts, colours and sizes used within the report.<br><br>Style scripts can be used to layout cover pages, table of contents and other unique tables or sections.<br><br>Custom style scripts can be created to format reports to match your corporate identity. |

## Report Modules

Select a module to open its repository and documentation.

<p align="center">
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Core"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Core.png" alt="AsBuiltReport.Core" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Aruba.ClearPass"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Aruba.ClearPass.png" alt="AsBuiltReport.Aruba.ClearPass" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.DellEMC.VxRail"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.DellEMC.VxRail.png" alt="AsBuiltReport.DellEMC.VxRail" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Fortinet.FortiGate"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Fortinet.FortiGate.png" alt="AsBuiltReport.Fortinet.FortiGate" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Microsoft.AD"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Microsoft.AD.png" alt="AsBuiltReport.Microsoft.AD" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Microsoft.Azure"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Microsoft.Azure.png" alt="AsBuiltReport.Microsoft.Azure" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Microsoft.DHCP"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Microsoft.DHCP.png" alt="AsBuiltReport.Microsoft.DHCP" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Microsoft.SCVMM"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Microsoft.SCVMM.png" alt="AsBuiltReport.Microsoft.SCVMM" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Microsoft.Windows"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Microsoft.Windows.png" alt="AsBuiltReport.Microsoft.Windows" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.NetApp.ONTAP"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.NetApp.ONTAP.png" alt="AsBuiltReport.NetApp.ONTAP" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Nutanix.PrismElement"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Nutanix.PrismElement.png" alt="AsBuiltReport.Nutanix.PrismElement" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.PureStorage.FlashArray"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.PureStorage.FlashArray.png" alt="AsBuiltReport.PureStorage.FlashArray" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Rubrik.CDM"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Rubrik.CDM.png" alt="AsBuiltReport.Rubrik.CDM" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.VMware.AppVolumes"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.VMware.AppVolumes.png" alt="AsBuiltReport.VMware.AppVolumes" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.VMware.ESXi"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.VMware.ESXi.png" alt="AsBuiltReport.VMware.ESXi" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.VMware.Horizon"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.VMware.Horizon.png" alt="AsBuiltReport.VMware.Horizon" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.VMware.SRM"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.VMware.SRM.png" alt="AsBuiltReport.VMware.SRM" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.VMware.vSphere"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.VMware.vSphere.png" alt="AsBuiltReport.VMware.vSphere" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Veeam.VB365"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Veeam.VB365.png" alt="AsBuiltReport.Veeam.VB365" width="270"></a>
    <a href="https://github.com/AsBuiltReport/AsBuiltReport.Veeam.VBR"><img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/tiles/AsBuiltReport.Veeam.VBR.png" alt="AsBuiltReport.Veeam.VBR" width="270"></a>
</p>

## Get Started

| :rocket: **New to AsBuiltReport?** | :electric_plug: **Looking for a specific module?** |
| :-----------------------| :-----------------------|
| Follow the [Quickstart Guide](https://www.asbuiltreport.com/user-guide/quickstart/) to generate your first report in minutes. | Browse all available [Report Modules](https://www.asbuiltreport.com/user-guide/report-modules/overview/#activity-status) by vendor and technology. |
