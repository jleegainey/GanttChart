/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    import Selection = d3.Selection;
    import SelectableDataPoint = powerbi.extensibility.utils.interactivity.SelectableDataPoint;
    import IInteractiveBehavior = powerbi.extensibility.utils.interactivity.IInteractiveBehavior;
    import ISelectionHandler = powerbi.extensibility.utils.interactivity.ISelectionHandler;

    export class behavior implements IInteractiveBehavior {

     private options: IGanttBehaviorOptions;
        private selectionHandler: ISelectionHandler;

        public bindEvents(options: IGanttBehaviorOptions, selectionHandler: ISelectionHandler): void {
            this.options = options;
            this.selectionHandler = selectionHandler;
            options.taskSelection.on("click", (d: SelectableDataPoint) => {
                selectionHandler.handleSelection(d, (<MouseEvent>d3.event).ctrlKey);
                (<Event>d3.event).stopPropagation();
            });
        }

        public renderSelection(hasSelection: boolean): void {
            this.options.taskSelection.style("opacity", (d: SelectableDataPoint) => {
                return (hasSelection && !d.selected) ?
                Gantt.defaultValues.MinTaskOpacity : Gantt.defaultValues.MaxTaskOpacity;
            });
            this.options.legendSelection.style("opacity", (d: SelectableDataPoint) => {
                return (hasSelection && !d.selected) ?
                Gantt.defaultValues.MinTaskOpacity : Gantt.defaultValues.MaxTaskOpacity;
            });
        }
    }
}
