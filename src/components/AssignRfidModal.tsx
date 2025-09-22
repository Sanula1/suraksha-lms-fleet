import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ApiService from '@/services/api';

interface AssignRfidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AssignRfidModal({ isOpen, onClose, onSuccess }: AssignRfidModalProps) {
  const [formData, setFormData] = useState({
    userId: '',
    userRfid: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.userRfid) {
      setAlertTitle('Validation error');
      setAlertDescription('Please fill in all fields');
      setIsSuccessAlert(false);
      setAlertOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await ApiService.assignRfid(formData);

      if (response?.success) {
        setAlertTitle('Success');
        setAlertDescription(response.message || 'RFID registered successfully');
        setIsSuccessAlert(true);
        setAlertOpen(true);
        setFormData({ userId: '', userRfid: '' });
      } else {
        setAlertTitle('Unsuccessful');
        setAlertDescription(response?.message || 'RFID registered unsuccessfully');
        setIsSuccessAlert(false);
        setAlertOpen(true);
      }
    } catch (error) {
      console.error('Error assigning RFID:', error);
      setAlertTitle('Unsuccessful');
      setAlertDescription('RFID registered unsuccessfully');
      setIsSuccessAlert(false);
      setAlertOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ userId: '', userRfid: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign RFID</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              type="text"
              placeholder="Enter user ID"
              value={formData.userId}
              onChange={(e) => setFormData(prev => ({ ...prev, userId: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userRfid">RFID Tag</Label>
            <Input
              id="userRfid"
              type="text"
              placeholder="Enter RFID tag (e.g., RFID123456789)"
              value={formData.userRfid}
              onChange={(e) => setFormData(prev => ({ ...prev, userRfid: e.target.value }))}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Assigning...' : 'Assign RFID'}
            </Button>
          </div>
        </form>
      </DialogContent>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setAlertOpen(false);
                if (isSuccessAlert) {
                  onSuccess();
                }
              }}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}