/*
* @file Health ViewModel
* @author Wade Penistone (Truemedia)
* @overview Handling and tracking health of players
* @copyright Wade Penistone 2018
* @license MIT license ({@link http://opensource.org/licenses/MIT| See here})
* Git repo: {@link http://www.github.com/Truemedia/regeneration-scores| Github repository}
* Author links: {@link http://youtube.com/MCOMediaCityOnline| YouTube} and {@link http://github.com/Truemedia| Github}
*/

import Vue from 'vue';
import jQuery from 'jquery';
import {timer} from 'd3-timer';
const ms = require('milliseconds');
const settings = require('./../../config/health.json');

export default class Health
{
    constructor()
    {
        // this.registerEvents();
    }

    /* Register jQuery event handlers */
    registerEvents() {
        jQuery('div[data-package="points"]').on("click", ".debug_button", function(e) {

            jQuery(this).next(".debug_controls").toggle();
            e.preventDefault();
        });
    }

    static vm() {
        return {
            el: '[data-vm="health"]',
            delimiters: ['${', '}'],
            data: {
                value: parseInt(settings.max_value),
                step: parseInt(settings.default_step),
                minValue: parseInt(settings.min_value),
                maxValue: parseInt(settings.max_value)
            },
            mounted: function() {
                this.reoccuringDamage(); // Poison weapon test
            },
            computed: {
                progress: function() { return this.value + '%'; },
                color: function() {
                    switch (true) {
                        case (this.value >= 90) : return 'LightGreen'; break; // Green (100 - 90% health)
                        case (this.value >= 75) : return 'Orange'; break; // Orange (89% - 75% health)
                        case (this.value >= 60) : return 'Yellow'; break; // Yellow (74% - 60% health)
                        case (this.value >= 40) : return 'HotPink'; break; // Pink (59% - 40% health)
                        case (this.value >= 20) : return 'Purple'; break; // Purple (40% - 20% health)
                        case (this.value >= 1) : return 'Crimson'; break; // Red (20% - 1% health)
                        default: return 'Grey'; break; // Grey (0% health)
                    }
                },
                dead: function() { return !(this.value > 0) }
            },
            // Increase/Decrease methods
            methods: {
                increase: function()
                {
                    if (!this.dead) {
                        if (this.value <= (this.maxValue - this.step)) { // Increased
                            // if (this.playerId === 0) {
                            //     jQuery("#player_purgatory > span").html("Alive");
                            //     jQuery("#player_purgatory")
                            //         .removeClass("deceased")
                            //         .addClass("alive");
                            // }
                            this.value += this.step;
                        } else { // Reached upper limit
                            // if (this.playerId === 0)
                            // {
                            //     jQuery("#player_purgatory > span").html("Alive");
                            //     jQuery("#player_purgatory")
                            //         .removeClass("deceased")
                            //         .addClass("alive");
                            // }
                            this.value = this.maxValue;
                        }
                    }
                },
                decrease: function()
                {
                    if (this.value >= (this,minValue + this.step)) { // Decreased
                        // if (this.playerId === 0) {
                        //     jQuery("#player_purgatory > span").html("Alive");
                        //     jQuery("#player_purgatory")
                        //         .removeClass("deceased")
                        //         .addClass("alive");
                        // }
                        this.value -= this.step;
                    } else { // Reached lower limit
                        // if (this.playerId === 0) {
                        //     jQuery("#player_purgatory > span").html("Deceased (no health)");
                        //     jQuery("#player_purgatory")
                        //         .removeClass("alive")
                        //         .addClass("deceased");
                        // }

                        if (!this.dead) { // Kill off the player
                            this.value = this.minValue;
                            // toastr.error("Stay alive until the next round", "Player " + (player_id() + 1) + " has been killed");
                        }
                    }
                },
                fallDamage: function(velocity) { // Calculate fall damage upon impact
                    let minVelocity = -8; // m/s
                    if (velocity < minVelocity) {
                        let dmg = (velocity + minVelocity) * 2;
                        this.value -= Math.round(dmg);
                    }
                },
                reoccuringDamage: function(value = 1, interval = 2, duration = 4) { // Inflict continuous damage as interval for specified period
                    let t = timer( (elapsed) => {
                        this.value -= value;
                      if (elapsed > ms.seconds(duration)) t.stop();
                  }, ms.seconds(interval));
                }
                /* Allocate ideal number of points based on several criteria */
                // allocate_points: function(universal_points)
                // {
                //     // Calculate potential values
                //     var exchange_rate = parseInt( Config.get('points::health.exchange_rate') ),
                //         potential_points = Math.floor(universal_points / exchange_rate),
                //         max_points = parseInt( Config.get('points::health.max_value') );
                //
                //     // Allocate values to be used
                //     var used_points = (potential_points < max_points) ? potential_points : max_points,
                //         used_universal_points = (used_points * exchange_rate);
                //
                //     Health.points = used_points;
                //
                //     return used_universal_points;
                // }
            }
        };
    }
}
