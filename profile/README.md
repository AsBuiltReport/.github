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

<table width="100%">
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/multiple-document-formats.png" alt="Multiple Document Formats" width="100%"><br>
            Generate reports in one or more document formats, including DOCX, HTML, and Text.
        </td>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/multilingual-support.png" alt="Multilingual Support" width="100%"><br>
            Comprehensive <a href="https://www.asbuiltreport.com/dev-guide/creating-a-report-module/#language-support-implementation">multilingual support</a> allows reports to be generated in <a href="https://www.asbuiltreport.com/dev-guide/creating-a-report-module/#language-configuration">multiple languages</a>, where available.
        </td>
    </tr>
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/granular-information-level.png" alt="Granular Information Level" width="100%"><br>
            <a href="https://www.asbuiltreport.com/user-guide/new-asbuiltreportconfig/#understanding-infolevel">Configure the information level</a> for each report section. You can create a summary report, a fully comprehensive report, or something in between.
        </td>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/customised-styling.png" alt="Customised Styling" width="100%"><br>
            Use the default style or <a href="https://www.asbuiltreport.com/dev-guide/creating-a-report-style/">create your own</a> to match your corporate identity. Set page orientation, text and table formatting with fonts, colours, borders and highlighted cells and rows.
        </td>
    </tr>
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/modular-architecture.png" alt="Modular Architecture" width="100%"><br>
            The modular architecture and core framework enables users to use the same in-built commands to generate as-built configuration reports from a library of technology vendors.
        </td>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/health-checks.png" alt="Health Checks" width="100%"><br>
            <a href="https://www.asbuiltreport.com/user-guide/quickstart/#enable-health-checks">Enable health checks</a> to highlight configuration issues within a report. Toggle individual health checks on or off as required.
        </td>
    </tr>
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/email-reports.png" alt="Email Reports" width="100%"><br>
            Attach and send reports via email to one or more recipients.
        </td>
        <td width="50%"></td>
    </tr>
</table>

## Use Cases

<table width="100%">
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/compliance-audits.png" alt="Compliance Audits" width="100%"><br>
            Generate point-in-time infrastructure documentation for ISO 27001, SOC 2, PCI-DSS, and other compliance frameworks.
        </td>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/change-management.png" alt="Change Management" width="100%"><br>
            Produce before-and-after documentation for change advisory board (CAB) submissions and post-change verification.
        </td>
    </tr>
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/environment-handover.png" alt="Environment Handover" width="100%"><br>
            Accelerate onboarding and handover with comprehensive, consistent infrastructure documentation generated on demand.
        </td>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/disaster-recovery.png" alt="Disaster Recovery" width="100%"><br>
            Maintain accurate as-built records of your infrastructure to support disaster recovery planning and runbook validation.
        </td>
    </tr>
</table>

## Components

<table width="100%">
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/core-module.png" alt="Core Module" width="100%"><br>
            The core module provides the framework for each individual report module. It provides the <a href="https://www.asbuiltreport.com/user-guide/new-asbuiltreport/">base commands</a> and default style script used to generate each individual report.
        </td>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/reports-module.png" alt="Reports Module" width="100%"><br>
            The report module is specific to each vendor and/or technology and is used to extract information from the specific environment.<br><br>The report module will be written to utilise PowerShell modules or RESTful APIs which the vendor/technology provides.
        </td>
    </tr>
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/core-module-configuration.png" alt="Core Module Configuration" width="100%"><br>
            The core module configuration is a JSON file which stores information relating to the author’s name, company information & SMTP mail server configuration.<br><br>Individual core module configuration files can be saved and specified when generating reports.
        </td>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/reports-module-configuration.png" alt="Reports Module Configuration" width="100%"><br>
            The reports module configuration is a JSON file which stores information specific to the related report. It holds information such as the report name, version, and release status.<br><br>The report configuration can also provide functionality such as configurable report options, health checks and granular information levels.<br><br>Individual report module configuration files can be saved and specified when generating reports.
        </td>
    </tr>
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/styles-script.png" alt="Styles Script" width="100%"><br>
            The styles script sets the default layout, fonts, colours and sizes used within the report.<br><br>Style scripts can be used to layout cover pages, table of contents and other unique tables or sections.<br><br>Custom style scripts can be created to format reports to match your corporate identity.
        </td>
        <td width="50%"></td>
    </tr>
</table>

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

<table width="100%">
    <tr>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/new-to-asbuiltreport.png" alt="New to AsBuiltReport?" width="100%"><br>
            Follow the <a href="https://www.asbuiltreport.com/user-guide/quickstart/">Quickstart Guide</a> to generate your first report in minutes.
        </td>
        <td width="50%" valign="top">
            <img src="https://raw.githubusercontent.com/AsBuiltReport/.github/main/profile/images/banners/looking-for-a-specific-module.png" alt="Looking for a specific module?" width="100%"><br>
            Browse all available <a href="https://www.asbuiltreport.com/user-guide/report-modules/overview/#activity-status">Report Modules</a> by vendor and technology.
        </td>
    </tr>
</table>
