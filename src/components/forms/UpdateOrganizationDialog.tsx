import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Organization, organizationSpecificApi, OrganizationUpdateData } from '@/api/organization.api';
import { Save, Loader2 } from 'lucide-react';

interface UpdateOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: Organization;
  onUpdate?: (updatedOrganization: Organization) => void;
}

const UpdateOrganizationDialog = ({ 
  open, 
  onOpenChange, 
  organization,
  onUpdate 
}: UpdateOrganizationDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OrganizationUpdateData>({
    name: organization.name,
    isPublic: organization.isPublic,
    needEnrollmentVerification: organization.needEnrollmentVerification,
    enabledEnrollments: true,
    imageUrl: organization.imageUrl || '',
    instituteId: organization.instituteId || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim()) {
      toast({
        title: "Error",
        description: "Organization name is required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const updatedOrganization = await organizationSpecificApi.updateOrganizationManagement(
        organization.organizationId, 
        formData
      );

      toast({
        title: "Success",
        description: "Organization updated successfully",
      });

      onUpdate?.(updatedOrganization);
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating organization:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update organization",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof OrganizationUpdateData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Organization</DialogTitle>
          <DialogDescription>
            Update the organization details and settings
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter organization name"
                required
              />
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl || ''}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <Label htmlFor="enrollmentKey">Enrollment Key</Label>
              <Input
                id="enrollmentKey"
                value={formData.enrollmentKey || ''}
                onChange={(e) => handleInputChange('enrollmentKey', e.target.value)}
                placeholder="Enter enrollment key"
              />
            </div>

            <div>
              <Label htmlFor="instituteId">Institute ID</Label>
              <Input
                id="instituteId"
                value={formData.instituteId || ''}
                onChange={(e) => handleInputChange('instituteId', e.target.value)}
                placeholder="Enter institute ID"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="isPublic">Public Organization</Label>
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="needEnrollmentVerification">Require Enrollment Verification</Label>
              <Switch
                id="needEnrollmentVerification"
                checked={formData.needEnrollmentVerification}
                onCheckedChange={(checked) => handleInputChange('needEnrollmentVerification', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="enabledEnrollments">Enable Enrollments</Label>
              <Switch
                id="enabledEnrollments"
                checked={formData.enabledEnrollments}
                onCheckedChange={(checked) => handleInputChange('enabledEnrollments', checked)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Organization
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrganizationDialog;