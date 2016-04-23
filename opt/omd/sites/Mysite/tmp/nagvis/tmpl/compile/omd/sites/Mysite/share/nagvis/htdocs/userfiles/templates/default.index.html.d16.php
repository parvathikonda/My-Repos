<?php
ob_start(); /* template body */ ?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US">
<head>
    <link rel="shortcut icon" href="<?php echo $this->scope["htmlBase"];?>/frontend/nagvis-js/images/internal/favicon.png" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title><?php echo $this->scope["pageTitle"];?></title>
    <meta name="viewport" content="width=480, initial-scale=0.6666, maximum-scale=1.0, minimum-scale=0.6666" />

    <?php if ((isset($this->scope["bUseCompressedJs"]) ? $this->scope["bUseCompressedJs"] : null)) {
?>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisCompressed.js"></script>
    <?php 
}
else {
?>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>ExtStacktrace.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>nagvis.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>edit.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>popupWindow.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>ExtBase.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>frontendMessage.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>frontendEventlog.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>frontendHover.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>hover.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>frontendContext.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>ajax.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>ajaxActions.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>dynfavicon.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>lines.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisObject.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisStatefulObject.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisStatelessObject.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisHost.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisService.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisHostgroup.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisServicegroup.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisDynGroup.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisAggr.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisMap.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisShape.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisLine.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisTextbox.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisContainer.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>NagVisRotation.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>frontend.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>ExtWzJsGraphics.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>ExtGenericResize.js"></script>
    <script type="text/javascript" src="<?php echo $this->scope["htmlJs"];?>ExtJSColor.js"></script>
    <?php 
}?>

    <link rel="stylesheet" type="text/css" href="<?php echo $this->scope["htmlTemplates"];?>default.css" />
    <?php if ((isset($this->scope["customStylesheet"]) ? $this->scope["customStylesheet"] : null) != "") {
?>
    <link rel="stylesheet" type="text/css" href="<?php echo $this->scope["customStylesheet"];?>" />
    <?php 
}?>

</head>
<body class="main">

<!-- Start rotation properties -->
<script type="text/javascript">
oViewProperties = {};
oRotationProperties = {"rotationEnabled":0,"nextStepUrl":"","nextStepTime":""};
jscolor.dir = '<?php echo $this->scope["htmlBase"];?>/frontend/nagvis-js/images/jscolor/';
</script>

<!-- Start header menu -->
<?php echo $this->scope["headerMenu"];?>


<!-- Start content -->
<?php echo $this->scope["content"];?>


</body>
</html>
<?php  /* end template body */
return $this->buffer . ob_get_clean();
?>