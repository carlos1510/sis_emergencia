<!DOCTYPE html>
<html>
<!-- Mirrored from webapplayers.com/inspinia_admin-v2.9.2/HTML5_Full_Version_MD/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 10 Jul 2019 21:51:39 GMT -->
<head>

	<meta charset="utf-8">
	<meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<title>@yield('title')</title>

	@yield('stylesheets')

	@yield('javascripts')
</head>

<body ng-app="app" @yield('bodycontroller')>
@yield('body')
</body>
</html>

