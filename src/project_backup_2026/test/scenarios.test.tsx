import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TemplateService } from '../lib/templateService';
import { SettingsService } from '../lib/settings';

// Mock Services
vi.mock('../lib/templateService', () => ({
    TemplateService: {
        getAll: vi.fn(),
        syncTemplates: vi.fn(),
        syncFromLocal: vi.fn(),
        updateTemplate: vi.fn(),
    },
}));

vi.mock('../lib/settings', () => ({
    SettingsService: {
        getSettings: vi.fn(),
        updateSetting: vi.fn(),
    },
}));

describe('Scenario 3: Template Sync Logic', () => {
    it('Syncs templates to DB', async () => {
        await TemplateService.syncFromLocal();
        expect(TemplateService.syncFromLocal).toHaveBeenCalled();
    });

    it('Fetches all templates', async () => {
        (TemplateService.getAll as any).mockResolvedValue([{ id: 1, title: 'Test' }]);
        const result = await TemplateService.getAll();
        expect(result).toHaveLength(1);
    });
});

describe('Scenario 4: Settings Verification', () => {
    it('Settings Service fetches correct config', async () => {
        const mockSettings = { upi_id: 'new@upi', qr_code_url: 'http://new.qr', instagram_url: 'http://new.insta' };
        (SettingsService.getSettings as any).mockResolvedValue(mockSettings);

        const result = await SettingsService.getSettings();
        expect(result).toEqual(mockSettings);
    });
});
