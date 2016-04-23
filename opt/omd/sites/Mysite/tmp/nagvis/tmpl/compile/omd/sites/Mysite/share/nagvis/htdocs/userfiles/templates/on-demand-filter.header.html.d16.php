<?php
ob_start(); /* template body */ ?><script type="text/javascript" src="<?php echo $this->scope["pathTemplates"];?>default.header.js"></script>
<script type="text/javascript">
function filter_group(field) {
    var grp = field.value;
    if(workerTimeoutID)
        window.clearTimeout(workerTimeoutID);

    window.location = makeuri({'filter_group': grp});
    storeUserOption('params-', '{"filter_group": "'+grp+'"}');
}
</script>
<div id="headershow" class="header"><a href="#" onclick="headerToggle(true)"><img src="<?php echo $this->scope["pathTemplateImages"];?>default.header_show.png" alt="Show header menu" /></a></div>
<div id="header" class="header">
<ul class="head">
  <li><a href="#" onclick="headerToggle(true)"><img src="<?php echo $this->scope["pathTemplateImages"];?>default.header_hide.png" alt="Hide header menu" /></a></li>
    <li><span>Filter:</span></li>
    <li><span>
      <select onchange="filter_group(this)">
        <?php 
$_fh0_data = (isset($this->scope["hostgroups"]) ? $this->scope["hostgroups"] : null);
if ($this->isArray($_fh0_data) === true)
{
	foreach ($_fh0_data as $this->scope['hostgroup'])
	{
/* -- foreach start output */
?><option <?php if ((isset($this->scope["filter_group"]) ? $this->scope["filter_group"] : null) == (isset($this->scope["hostgroup"]["name1"]) ? $this->scope["hostgroup"]["name1"]:null)) {
?>selected <?php 
}?>value="<?php echo $this->scope["hostgroup"]["name1"];?>"><?php echo $this->scope["hostgroup"]["name2"];?></option><?php 
/* -- foreach end output */
	}
}?>

      </select>
    </span></li>
  </li>
</ul>
</div>
<div id="headerspacer"></div>
<script type="text/javascript">addDOMLoadEvent(function(){headerDraw();});</script>
<?php  /* end template body */
return $this->buffer . ob_get_clean();
?>