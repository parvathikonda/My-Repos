<?php
ob_start(); /* template body */ ?><div id="map" class="map"></div>

<script type="text/javascript">
oGeneralProperties = <?php echo $this->scope["generalProperties"];?>;
oWorkerProperties = <?php echo $this->scope["workerProperties"];?>;
oViewProperties = <?php echo $this->scope["viewProperties"];?>;
oRotationProperties = <?php echo $this->scope["rotationProperties"];?>;
oUserProperties = <?php echo $this->scope["userProperties"];?>;
oStates = <?php echo $this->scope["stateProperties"];?>;
oLocales = <?php echo $this->scope["locales"];?>;
oFileAges = <?php echo $this->scope["fileAges"];?>;

// Kick of the worker
addDOMLoadEvent(function(){runWorker(0, 'map', '<?php echo $this->scope["mapName"];?>');});

// Parses the grid if a user enabled it
gridParse();

// This disables the context menu when someone clicked anywhere on the map
document.onmousedown = contextMouseDown;
window.onresize = function() { scaleView(); <?php if ((isset($this->scope["zoomFill"]) ? $this->scope["zoomFill"] : null)) {
?>set_zoom('fill');<?php 
}?> };
window.onscroll = function() { scaleView(); };
</script>
<?php  /* end template body */
return $this->buffer . ob_get_clean();
?>