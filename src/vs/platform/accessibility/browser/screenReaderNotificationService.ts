/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from 'vs/base/common/lifecycle';
import { localize } from 'vs/nls';
import { IAccessibilityService, IScreenReaderNotificationService } from 'vs/platform/accessibility/common/accessibility';
import { AudioCue, IAudioCueService } from 'vs/platform/audioCues/browser/audioCueService';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';

export class ScreenReaderNotificationService extends Disposable implements IScreenReaderNotificationService {
	declare readonly _serviceBrand: undefined;

	constructor(@IAudioCueService private readonly _audioCueService: IAudioCueService,
		@IConfigurationService private readonly _configurationService: IConfigurationService,
		@IAccessibilityService private readonly _accessibilityService: IAccessibilityService) {
		super();
	}

	notifyCleared(): void {
		const audioCueValue = this._configurationService.getValue('audioCues.clear');
		if (audioCueValue === 'on' || audioCueValue === 'auto' && this._accessibilityService.isScreenReaderOptimized()) {
			this._audioCueService.playAudioCue(AudioCue.clear);
		} else {
			alert(localize('cleared', "Cleared"));
		}
	}
}

export class TestScreenReaderNotificationService implements IScreenReaderNotificationService {

	declare readonly _serviceBrand: undefined;

	notifyCleared(): void { }
}
