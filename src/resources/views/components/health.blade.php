<div class="list-group" data-vm="health" style="position: absolute; top: 0;">
    {{-- TODO: Iterate each player --}}
	<div class="score_container list-group-item" style="clear: both;">
		<img class="img-thumbnail pull-right" src="" alt="Character" />
		<small>Player ${playerId}</small>
		<h5 class="list-group-item-heading">(Username)</h5>
		<div class="row">
			<div class="col-xs-9">
				<div class="progress">
				    <div class="progress-bar"
				    	 v-bind:style="{ width: progress, backgroundColor: color }"
				    	 role="progressbar"
				    	 aria-valuenow="60"
				    	 aria-valuemin="0"
				    	 aria-valuemax="100"
				    	 style="background-image: none;">
						<span class="text-danger" v-if="dead">DECEASED</span>
						<span v-if="!dead">
							HP: (<span>${value}</span>/<span>${maxValue}</span>)
						</span>
					</div>
				</div>
			</div>
			{{-- <div class="col-xs-1" data-bind="with: sp">
				<strong data-bind="text: value" style="color: {{characterColourScheme}};"></strong>
			</div> --}}
		</div>

		<!-- Debugging tools -->
		<!--<button class="debug_button btn btn-xs btn-warning" href="#">Debug</button>-->

		{{-- <div class="row debug_controls">
    		<table class="table table-condensed">
				<thead>
					<tr class="primary">
						{{#modules}}
						<td>
							<div class="panel panel-primary">
								<div class="panel-heading">
							    	<h5 class="panel-title">{{name}}</h5>
							    	<span>({{symbol}})</span>
								</div>
							  	<div class="panel-body" data-bind="with: {{identifier}}">
							    	<h5 class="text-danger" data-bind="text: value"></h5>
							  	</div>
							  	<div class="panel-footer">
							  		<div role="toolbar" class="btn-toolbar">
										<div class="btn-group btn-group-xs" data-bind="with: {{identifier}}">
						        			<button class="btn btn-default" type="button" data-bind="click: decrease" value="{{pid}}">
						        				<strong>-</strong> <span data-bind="text: step"></span> {{identifier}}
						        			</button>
						        			<button class="btn btn-default" type="button" data-bind="click: increase" value="{{pid}}">
						        				<strong>+</strong> <span data-bind="text: step"></span> {{identifier}}
						        			</button>
						      			</div>
						      		</div>
							  	</div>
							</div>
						</td>
						{{/modules}}
					</tr>
				</thead>
				<tbody>
					<tr class="primary">
						<td>
							<h5 data-bind="text: total_points_formatted"></h5>
						</td>
					</tr>
				</tbody>
			</table>
		</div> --}}
		<!--
			Used to make sure data is fed to #my_score
			<div style="display: none;" data-bind="with: sp"><div data-bind="singleton: sp"></div></div>
		-->
	</div>
</div>
